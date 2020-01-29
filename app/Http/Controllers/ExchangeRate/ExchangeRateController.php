<?php

namespace App\Http\Controllers\ExchangeRate;

use App\Http\Controllers\Currency\CurrencyController;
use Illuminate\Support\Facades\DB;

class ExchangeRateController extends CurrencyController
{
    /*
     * Get the daily exchange rate from openexchangeapirates.org API
     */
    protected $base_value;
    
    public function insertExchangeRates($rates) {
        //insert exchange rates into the exchange rate table
        foreach ($rates as $exchange_rate){
            DB::table($this->tables[self::TBL_EXCHANGE_RATE][0])->insert($exchange_rate);
        }
    }
    
    public function baseCurrencyExhangeRate($company, $rates) {
        //get the base currency exchange rate
        return [ 'company_id' => $company['company_id'], 'currency_code' => $company['currency_code'] ,'base_currency_rate' => $rates[ $company['currency_code'] ] ];
    }
    
    public function exchangeRateCoverter($company_base_currency_rates, $rates, $current_currencies) {
        //remove base currency from rates
        unset($rates[ $company_base_currency_rates['currency_code'] ], $current_currencies[ array_search($company_base_currency_rates['currency_code'], $current_currencies) ]);
        //update exhange rates
        foreach ($rates as $currency => $rate) {
            //round the exhange rates to 4 decimals
            $current_currencies[array_search($currency, $current_currencies)] = [ 'exchange_rate_date' => date("Y-m-d"), 'exchange_rate_currency' => array_search($currency, $current_currencies), 'exchange_rate' => round(((1 / $rate)* $company_base_currency_rates['base_currency_rate']), 4), 'exchange_rate_company' => $company_base_currency_rates['company_id'] ];
        }
        //return currenct currency array values
        return array_values($current_currencies);
    }
}
