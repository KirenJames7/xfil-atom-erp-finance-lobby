<?php

namespace App\Http\Controllers\Company\Site;

use Illuminate\Http\Request;
use App\Http\Controllers\Company\CompanyController;
use Illuminate\Support\Facades\DB;

class SiteController extends CompanyController
{
    const SITES_JSON_NAME = 'company_sites';
    private $sites;
    private $sitesAPI;
    public function getCompanySites($business_reg_no) {
        $this->sites = DB::table($this->tables[ self::TBL_SITE ][0])->join($this->tables[ self::TBL_COMPANY ][0], $this->tables[ self::TBL_SITE ][1][7], '=', $this->tables[ self::TBL_COMPANY ][0].'.'.$this->tables[ self::TBL_COMPANY ][1][0])->select($this->tables[ self::TBL_SITE ][1][1], $this->tables[ self::TBL_SITE ][1][2])->where($this->tables[ self::TBL_COMPANY ][0].'.'.$this->tables[ self::TBL_COMPANY ][1][9], $business_reg_no)->get();
        return response()->json([ self::SITES_JSON_NAME => $this->sites ]);
    }
    
    public function getCompanySitesAPI($business_reg_no) {
        $this->sitesAPI = $this->apiGenerator($this->getCompanySites($business_reg_no)->getData(true)[ self::SITES_JSON_NAME ], 0, 1);
        return response()->json([ self::SITES_JSON_NAME => $this->sitesAPI ]);
    }
}