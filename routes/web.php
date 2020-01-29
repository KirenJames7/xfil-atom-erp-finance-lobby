<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app.index');
});

Route::get('apiap', 'Controller@getAPAPIUrl')->middleware('ajax');

Route::get('apiim', 'Controller@getIMAPIUrl')->middleware('ajax');

Route::get('logincompanies', 'Company\CompanyController@getAllCompanies')->middleware('ajax');

Route::get('features', 'Feature\FeatureController@getFeatures')->middleware('ajax');

Route::get('chartofaccounts', 'ChartOfAccounts\ChartOfAccountsController@getAllCompanyChartOfAccounts')->middleware('ajax');

Route::post('authenticate', 'LDAPAuth\User\UserController@userSignIn')->middleware('ajax');

Route::post('unauthenticate', 'LDAPAuth\User\UserController@userSignOut')->middleware('ajax');

Route::get('checkactivesession', 'LDAPAuth\User\UserController@userSessionActiveCheck')->middleware('ajax');

Route::get('countries', 'Country\CountryController@listAllCountires')->middleware('ajax');

Route::get('countryprovincesstates', 'Country\ProvinceState\ProvinceStateController@listAllCountryProvincesStates')->middleware('ajax');

Route::get('provincestatecities', 'Country\ProvinceState\City\CityController@listAllProvinceStateCities')->middleware('ajax');