<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Country;
use Dingo\Api\Routing\Helpers;
use App\Transformers\CountryTransformer;

class CountriesController extends Controller
{
    use Helpers;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Country::all();

        return $this->collection($countries, new CountryTransformer);

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\StoreCountryRequest $request)
    {

        if (Country::create($request->all())) {
            return $this->response->created(); // 201 response
        }

        return $this->response->errorBadRequest();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //$country = Country::where('id',$id)->get();
        //$country = Country::whereId($id)->get();
        //$country = Country::findOrFail($id);
        $country = Country::where('id',$id)->first();


        if ($country) {
            return $this->item($country, new CountryTransformer);
        }

        return $this->response->errorNotFound();
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id,Requests\StoreCountryRequest $request)
    {
        $country = Country::findOrFail($id);

        $country->update($request->all());
        if ($country) {
            return $this->response->noContent();
        }

        return $this->response->errorBadRequest();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $country = Country::findOrFail($id);

        if ($country) {

            $country->delete();
            return $this->response->noContent();
        }

        return $this->response->errorBadRequest();
    }
}
