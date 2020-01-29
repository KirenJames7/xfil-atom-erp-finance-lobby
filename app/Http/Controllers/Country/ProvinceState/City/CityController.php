<?php

namespace App\Http\Controllers\Country\ProvinceState\City;

use Illuminate\Http\Request;
use App\Http\Controllers\Country\ProvinceState\ProvinceStateController;
use Illuminate\Support\Facades\DB;

class CityController extends ProvinceStateController
{
    const PROVINCE_STATE_CITIES_JSON_NAME = 'province_state_cities';
    protected $province_state_cities;
    protected $province_state_citiesAPI;
    
    public function listAllProvinceStateCities(Request $request) {
        $this->cities_provinces_states = $this->getAllProvinceStateCities($request->province_state);
        return response()->json([ self::PROVINCE_STATE_CITIES_JSON_NAME => $this->cities_provinces_states ]);
    }
    
    public function getAllProvinceStateCities($province_state) {
        return DB::table( $this->tables[ self::TBL_PROVINCE_STATE ][0] )->join( $this->tables[ self::TBL_CITY ][0], $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][0], "=", $this->tables[ self::TBL_CITY ][0].".".$this->tables[ self::TBL_CITY ][1][3] )->select( $this->tables[ self::TBL_CITY ][0].".".$this->tables[ self::TBL_CITY ][1][0], $this->tables[ self::TBL_CITY ][0].".".$this->tables[ self::TBL_CITY ][1][1], $this->tables[ self::TBL_CITY ][0].".".$this->tables[ self::TBL_CITY ][1][2] )->where( $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][0], $province_state )->get();
    }
    
    public function listAllProvinceStateCitiesAPI(Request $request) {
        $this->cities_provinces_states = $this->getAllProvinceStateCitiesAPI($request->province_state, $request->country);
        return response()->json([ self::PROVINCE_STATE_CITIES_JSON_NAME => $this->cities_provinces_states ]);
    }
    
    public function getAllProvinceStateCitiesAPI($province_state, $country) {
        return DB::table( $this->tables[ self::TBL_PROVINCE_STATE ][0] )->join( $this->tables[ self::TBL_CITY ][0], $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][0], "=", $this->tables[ self::TBL_CITY ][0].".".$this->tables[ self::TBL_CITY ][1][3] )->join( $this->tables[ self::TBL_COUNTRY ][0], $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][3], "=", $this->tables[ self::TBL_COUNTRY ][0].".".$this->tables[ self::TBL_COUNTRY ][1][0] )->select( $this->tables[ self::TBL_CITY ][0].".".$this->tables[ self::TBL_CITY ][1][0], $this->tables[ self::TBL_CITY ][0].".".$this->tables[ self::TBL_CITY ][1][1], $this->tables[ self::TBL_CITY ][0].".".$this->tables[ self::TBL_CITY ][1][2] )->where( [ [ $this->tables[ self::TBL_PROVINCE_STATE ][0].".".$this->tables[ self::TBL_PROVINCE_STATE ][1][1], $province_state ], [ $this->tables[ self::TBL_COUNTRY ][0].".".$this->tables[ self::TBL_COUNTRY ][1][1], $country ] ] )->get();
    }
}
