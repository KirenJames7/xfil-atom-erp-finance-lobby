<?php

namespace App\Http\Controllers\Country\ProvinceState;

use Illuminate\Http\Request;
use App\Http\Controllers\Country\CountryController;
use Illuminate\Support\Facades\DB;

class ProvinceStateController extends CountryController
{
    const COUNTRY_PROVINCES_STATES_JSON_NAME = 'country_provinces_states';
    protected $country_provinces_states;
    protected $country_provinces_statesAPI;
    
    public function listAllCountryProvincesStates(Request $request) {
        $this->country_provinces_states = $this->getAllCountryProvincesStates($request->country);
        return response()->json([ self::COUNTRY_PROVINCES_STATES_JSON_NAME => $this->country_provinces_states ]);
    }
    
    public function getAllCountryProvincesStates($country) {
        return DB::table( $this->tables[ self::TBL_COUNTRY ][0] )->join( $this->tables[ self::TBL_PROVINCE_STATE ][0], $this->tables[ self::TBL_COUNTRY ][0].".".$this->tables[ self::TBL_COUNTRY ][1][0], "=", $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][3] )->select( $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][0], $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][1], $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][2] )->where( $this->tables[ self::TBL_COUNTRY ][0].".".$this->tables[ self::TBL_COUNTRY ][1][0], $country )->get();
    }
    
    public function listAllCountryProvincesStatesAPI(Request $request) {
        $this->country_provinces_statesAPI = $this->getAllCountryProvincesStatesAPI($request->country);
        return response()->json([ self::COUNTRY_PROVINCES_STATES_JSON_NAME => $this->country_provinces_statesAPI ]);
    }
    
    public function getAllCountryProvincesStatesAPI($country) {
        return DB::table( $this->tables[ self::TBL_COUNTRY ][0] )->join( $this->tables[ self::TBL_PROVINCE_STATE ][0], $this->tables[ self::TBL_COUNTRY ][0].".".$this->tables[ self::TBL_COUNTRY ][1][0], "=", $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][3] )->where( $this->tables[ self::TBL_COUNTRY ][0].".".$this->tables[ self::TBL_COUNTRY ][1][1], $country )->pluck( $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][2], $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][1] );
    }
}
