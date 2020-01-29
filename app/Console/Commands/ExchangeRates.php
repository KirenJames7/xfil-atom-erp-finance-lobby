<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;
use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\Currency\CurrencyController;
use App\Http\Controllers\ExchangeRate\ExchangeRateController;

class ExchangeRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'exchange:rates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Downlaod the daily exchange rates for currencies used by the company(ies)';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    protected $config;
    protected $currency_controller;
    protected $exchange_rate_controller;
    protected $company_controller;
    protected $curencies;
    protected $current_curencies;
    protected $companies_base_currencies;
    protected $client;
    protected $response;
    protected $api_rates;
    protected $daily_rates;
    protected $base_value;
    protected $company_daily_rates = [];
    
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //daily exchange rate job runs at 12:00AM daily
        //configuration to attach certificate to get data form exchange rate API
        $this->config = [ 'defaults' => [ 'verify' => __DIR__ . "/cacert.pem" ] ];
        //create object to access CurrencyController
        $this->currency_controller = new CurrencyController();
        //get the currently defined currencies
        $this->curencies = $this->currency_controller->getAllCurrencies()->getData(true)[ 'currencies' ];
        //generate current currency array
        foreach ($this->curencies as $curency) {
            $this->current_currencies[$curency['currency_id']] = $curency['currency_code'];
        }
        //create instance of GuzzleClient to get API data
        $this->client = new Client($this->config);
        //get request to API
        $this->response = $this->client->get('https://openexchangerates.org/api/latest.json?app_id=414f234dcbe9411287f889a5f92c04c4&symbols=' . implode(",", $this->current_currencies));
        //convert JSON response to array
        $this->api_rates = json_decode($this->response->getBody()->getContents(), true);
        //create object to access CompanyController
        $this->company_controller = new CompanyController();
        //create object to access ExchangeRateController
        $this->exchange_rate_controller = new ExchangeRateController();
        //get companies base currency
        $this->companies_base_currencies = $this->company_controller->getAllCompaniesBaseCurrency()->getData(true)[ 'companies_base_currency' ];
        foreach ($this->companies_base_currencies as $company) {
            array_push($this->company_daily_rates, $this->exchange_rate_controller->exchangeRateCoverter($this->exchange_rate_controller->baseCurrencyExhangeRate($company, $this->api_rates['rates']), $this->api_rates['rates'], $this->current_currencies));
        }
        //insert daily exchange rates to table
        $this->exchange_rate_controller->insertExchangeRates($this->company_daily_rates);
    }
}