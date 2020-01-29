<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    const TBL_FEATURE = "tbl_feature";
    const TBL_COMPANY = "tbl_company";
    const TBL_USER = "tbl_user";
    const TBL_SITE = "tbl_site";
    const TBL_WAREHOUSE = "tbl_warehouse";
    const TBL_CURRENCY = "tbl_currency";
    const TBL_EXCHANGE_RATE = "tbl_exchange_rate";
    const TBL_COUNTRY = "tbl_country";
    const TBL_PROVINCE_STATE = "tbl_province_state";
    const TBL_CITY = "tbl_city";
    const TBL_CHART_OF_ACCOUNTS = "tbl_chart_of_accounts";
    const TBL_GENERAL_LEDGER_TRANSACTIONS = "tbl_general_ledger_transaction";
    const TBL_ACCOUNT_CATEGORY = "tbl_account_category";
    const TBL_ACCOUNT_TYPE = "tbl_account_type";
    
    protected $tables = [];
    private $api_data = [];


    public function __construct() {
        //get list of all tables
        $dbtable = DB::select('SHOW TABLES');
        //build array containing all schema tables
        foreach ($dbtable as $value) {
            $table = [];
            //push table name
            array_push($table, $value->Tables_in_finance_core);
            //get all columns of table
            $tablecolumns = DB::select('SHOW COLUMNS FROM ' . $value->Tables_in_finance_core);
            $columns = [];
            foreach ($tablecolumns as $column) {
                //push column name
                array_push($columns, $column->Field);
            }
            //push columns to the table array
            array_push($table, $columns);
            //create a key value pairing to the tables & columns
            $this->tables["$value->Tables_in_finance_core"] = $table;
        }
    }
    
    //generate a key value pair API from a given data set key & value depends on which record should be key and value
    public function apiGenerator($data, $key, $value) {
        //iterate through records and convert API 
        foreach ($data as $data_record){
            if(is_array($data_record)){
                //if API response contains multiple records
                //convert array to index array
                $temp = array_values($data_record);
                //assign key value pair
                $this->api_data[$temp[$key]] = $temp[$value];
            }else{
                //if API response contains a single record
                //convert array to index array
                $temp = array_values($data);
                //assign key value pair
                $this->api_data[$temp[$key]] = $temp[$value];
                //break out of loop as this is a single record
                break;
            }
        }
        return $this->api_data;
    }
    
    public function getAPAPIUrl() {
        return response()->json([ "url" => env('APP_AP_API') ]);
    }
    
    public function getIMAPIUrl() {
        return response()->json([ "url" => env('APP_IM_API') ]);
    }
}