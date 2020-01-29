<?php

namespace App\Http\Controllers\Company\Site\Warehouse;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class WarehouseController extends Controller
{
    const WAREHOUSES_JSON_NAME = "warehouses";
    private $warehouses;
    private $warehousesAPI;
    
    public function getSiteWarehouses($site_code) {
        $this->warehouses = DB::table($this->tables[ self::TBL_WAREHOUSE ][0])->join($this->tables[ self::TBL_SITE ][0], $this->tables[ self::TBL_WAREHOUSE ][1][3], '=', $this->tables[ self::TBL_SITE ][0].'.'.$this->tables[self::TBL_SITE][1][0])->select($this->tables[ self::TBL_WAREHOUSE ][1][1], $this->tables[ self::TBL_WAREHOUSE ][1][2])->where($this->tables[ self::TBL_SITE ][1][1], $site_code)->get();
        return response()->json([ self::WAREHOUSES_JSON_NAME => $this->warehouses ]);
    }
    
    public function getSiteWarehousesAPI($site_code) {
        $this->warehousesAPI = $this->apiGenerator($this->getSiteWarehouses($site_code)->getData(true)[ self::WAREHOUSES_JSON_NAME ], 0, 1);
        return response()->json([ self::WAREHOUSES_JSON_NAME => $this->warehousesAPI ]);
    }
}
