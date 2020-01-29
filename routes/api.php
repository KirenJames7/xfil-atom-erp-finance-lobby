<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('v1/companies', [ 'middleware' => 'cors', 'uses' => 'Company\CompanyController@getAllCompaniesAPI' ]);

Route::get('v1/companies/{company_business_reg_no}', [ 'middleware' => 'cors', 'uses' => 'Company\CompanyController@getCompanyInformationAPI' ]);

Route::get('v1/companies/sites/{company_business_reg_no}', 'Company\Site\SiteController@getCompanySitesAPI');

Route::get('v1/companies/sites/warehouses/{site_code}', 'Company\Site\Warehouse\WarehouseController@getSiteWarehousesAPI');

Route::get('testcomp', 'Company\CompanyController@getAllCompaniesBaseCurrency');

Route::get('v1/currencies', [ 'middleware' => 'cors', 'uses' => 'Currency\CurrencyController@listAllCurrenciesAPI' ]);

Route::get('v1/countries', [ 'middleware' => 'cors', 'uses' => 'Country\CountryController@listAllCountries' ]);

Route::get('v1/countryprovincesstates', [ 'middleware' => 'cors', 'uses' => 'Country\ProvinceState\ProvinceStateController@listAllCountryProvincesStates' ]);

Route::get('v1/provincestatecities', [ 'middleware' => 'cors', 'uses' => 'Country\ProvinceState\City\CityController@listAllProvinceStateCities' ]);