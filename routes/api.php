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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {


    // Countries
    $api->group(['prefix' => 'countries'], function ($api) {
        $api->get('/', 'App\Http\Controllers\CountriesController@index');
        $api->get('/{id}', 'App\Http\Controllers\CountriesController@show');
        $api->post('/', 'App\Http\Controllers\CountriesController@store');
        $api->put('/{id}', 'App\Http\Controllers\CountriesController@update');
        $api->delete('/{id}', 'App\Http\Controllers\CountriesController@destroy');

    });

    // Terms
    $api->group(['prefix' => 'terms'], function ($api) {
        $api->get('/', 'App\Http\Controllers\TermsController@index');
        $api->get('/{id}', 'App\Http\Controllers\TermsController@show');
        $api->post('/', 'App\Http\Controllers\TermsController@store');
        $api->put('/{id}', 'App\Http\Controllers\TermsController@update');
        $api->delete('/{id}', 'App\Http\Controllers\TermsController@destroy');

    });


});
