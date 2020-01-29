<?php

namespace App\Http\Controllers\Currency;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CurrencyController extends Controller
{
    const CURRENCIES_JSON_NAME = 'currencies';
    protected $currencies;
    protected $currenciesAPI;
    
    public function listAllCurrenciesAPI() {
        $this->getAllCurrenciesAPI();
        return response()->json([ self::CURRENCIES_JSON_NAME => $this->currenciesAPI ]);
    }
    
    //all the currencies
    public function getAllCurrencies() {
        $this->currencies = DB::table( $this->tables[ self::TBL_CURRENCY ][0] )->get();
        return response()->json([ self::CURRENCIES_JSON_NAME => $this->currencies ]);
    }
    
    //generate API data set for all currencies
    public function getAllCurrenciesAPI() {
        $this->currenciesAPI = DB::table( $this->tables[self::TBL_CURRENCY][0] )->select( $this->tables[ self::TBL_CURRENCY ][1][1], $this->tables[ self::TBL_CURRENCY ][1][2] )->get();
    }
}