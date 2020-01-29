<?php

namespace App\Http\Controllers\Company;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    const COMPANIES_JSON_NAME = "companies";
    const COMPANY_JSON_NAME = "company";
    protected $companies;
    protected $companiesAPI;
    protected $company;
    protected $companyAPI;
    protected $companies_base_currency;
    protected $company_base_currency;

    public function getAllCompanies() {
        $this->companies = DB::table( $this->tables[ self::TBL_COMPANY ][0] )->where( $this->tables[ self::TBL_COMPANY ][1][14], 1 )->get();
        return response()->json([ self::COMPANIES_JSON_NAME => $this->companies ]);
    }
    
    public function getAllCompaniesAPI() {
        $this->companiesAPI = $this->apiGenerator($this->getAllCompanies()->getData(true)[ self::COMPANIES_JSON_NAME ], 9, 1);
        return response()->json([ self::COMPANIES_JSON_NAME => $this->companiesAPI ]);
    }
    
    public function getCompanyInformation($company_business_reg_no, $select = []) {
        $query = DB::table($this->tables[ self::TBL_COMPANY ][0])
                ->join($this->tables[ self::TBL_CITY ][0], $this->tables[ self::TBL_COMPANY ][1][6], '=', $this->tables[ self::TBL_CITY ][0].'.'.$this->tables[ self::TBL_CITY ][1][0])
                ->join($this->tables[ self::TBL_PROVINCE_STATE ][0], $this->tables[ self::TBL_CITY ][1][3], '=', $this->tables[ self::TBL_PROVINCE_STATE ][0].'.'.$this->tables[ self::TBL_PROVINCE_STATE ][1][0])
                ->join($this->tables[ self::TBL_COUNTRY ][0], $this->tables[ self::TBL_PROVINCE_STATE ][1][3], '=', $this->tables[ self::TBL_COUNTRY ][0].'.'.$this->tables[ self::TBL_COUNTRY ][1][0]);
        if(count($select)){
            $query->selectRaw(implode(',', $select));
        }else{
            $query->select($this->tables[ self::TBL_COMPANY ][0].'.*', $this->tables[ self::TBL_PROVINCE_STATE ][0].'.'.$this->tables[ self::TBL_PROVINCE_STATE ][1][0], $this->tables[ self::TBL_COUNTRY ][0].'.'.$this->tables[ self::TBL_COUNTRY ][1][0]);
        }
        $this->company = $query->where($this->tables[ self::TBL_COMPANY ][1][9], $company_business_reg_no)->first();
        return response()->json([ self::COMPANY_JSON_NAME => $this->company ]);
    }
    
    public function getCompanyInformationAPI($company_business_reg_no) {
        $this->companyAPI = $this->getCompanyInformation($company_business_reg_no, [ $this->tables[ self::TBL_COMPANY ][1][1], $this->tables[ self::TBL_COMPANY ][1][2], $this->tables[ self::TBL_COMPANY ][1][3], $this->tables[ self::TBL_COMPANY ][1][4], $this->tables[ self::TBL_COMPANY ][1][5], $this->tables[ self::TBL_CITY ][0].'.'.$this->tables[ self::TBL_CITY ][1][2], $this->tables[ self::TBL_CITY ][0].'.'.$this->tables[ self::TBL_CITY ][1][1], $this->tables[ self::TBL_PROVINCE_STATE ][0].'.'.$this->tables[ self::TBL_PROVINCE_STATE ][1][2], $this->tables[ self::TBL_PROVINCE_STATE ][0].'.'.$this->tables[ self::TBL_PROVINCE_STATE ][1][1], $this->tables[ self::TBL_COUNTRY ][0].'.'.$this->tables[ self::TBL_COUNTRY ][1][2], $this->tables[ self::TBL_COUNTRY ][0].'.'.$this->tables[ self::TBL_COUNTRY ][1][1], $this->tables[ self::TBL_COMPANY ][1][9], $this->tables[ self::TBL_COMPANY ][1][10], $this->tables[ self::TBL_COMPANY ][1][11], $this->tables[ self::TBL_COMPANY ][1][12], $this->tables[ self::TBL_COMPANY ][1][15] ])->getData(true)[ self::COMPANY_JSON_NAME ];
        return response()->json([ self::COMPANY_JSON_NAME => $this->companyAPI ]);
    }
    
    public function getAllCompaniesBaseCurrency() {
        $this->companies_base_currency = DB::table($this->tables[ self::TBL_COMPANY ][0])->join($this->tables[ self::TBL_CURRENCY ][0], $this->tables[ self::TBL_COMPANY ][1][7], '=', $this->tables[self::TBL_CURRENCY][0].'.'.$this->tables[self::TBL_CURRENCY][1][0])->select($this->tables[ self::TBL_COMPANY ][1][0], $this->tables[ self::TBL_CURRENCY ][0].'.*')->where($this->tables[ self::TBL_COMPANY ][1][14], 1)->get();
        return response()->json([ 'companies_base_currency' => $this->companies_base_currency ]);
    }
    
    public function getCompanyBaseCurrency($company_business_reg_no) {
        $this->company_base_currency = DB::table($this->tables[ self::TBL_COMPANY ][0])->join($this->tables[ self::TBL_CURRENCY ][0], $this->tables[ self::TBL_COMPANY ][1][7], '=', $this->tables[self::TBL_CURRENCY][0].'.'.$this->tables[self::TBL_CURRENCY][1][0])->select($this->tables[ self::TBL_CURRENCY ][0].'.*')->where($this->tables[ self::TBL_COMPANY ][1][9], $company_business_reg_no)->first();
        return response()->json([ 'test' => $this->company_base_currency ]);
    }
}