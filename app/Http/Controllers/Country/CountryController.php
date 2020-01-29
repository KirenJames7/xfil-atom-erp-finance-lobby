<?php

namespace App\Http\Controllers\Country;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CountryController extends Controller
{
    const COUNTRY_JSON_NAME = 'countries';
    private $countries;
    private $countriesAPI;
    
    public function listAllCountries() {
        $this->countries = $this->getAllCountries();
        return response()->json([ self::COUNTRY_JSON_NAME => $this->countries ]);
    }
    
    public function listAllCountriesAPI() {
        $this->countriesAPI = $this->apiGenerator($this->listAllCountries()->getData(true)[ self::COUNTRY_JSON_NAME ], 1, 2);
        return response()->json([ self::COUNTRY_JSON_NAME => $this->countriesAPI ]);
    }
    
    public function getAllCountries() {
        return DB::table( $this->tables[ self::TBL_COUNTRY ][0] )->get();
    }
}
