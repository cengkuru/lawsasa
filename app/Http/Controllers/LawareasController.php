<?php

namespace App\Http\Controllers;

use App\Lawarea;
use Illuminate\Http\Request;
use App\Http\Requests;
use Dingo\Api\Routing\Helpers;
use App\Transformers\LawareaTransformer;
use Illuminate\Support\Facades\Crypt;

class LawareasController extends Controller
{
    use Helpers;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lawareas = Lawarea::all();

        return $this->collection($lawareas, new LawareaTransformer);

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\StoreLawareaRequest $request)
    {
        $lawarea = Lawarea::create($request->all());

        if ($lawarea) {
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

        $lawarea = Lawarea::where('id',Crypt::decrypt($id))->first();


        if ($lawarea) {

            return $this->item($lawarea, new LawareaTransformer);
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
    public function update($id,Requests\StoreLawareaRequest $request)
    {
        $lawarea = Lawarea::findOrFail(Crypt::decrypt($id));

        $lawarea->update($request->all());
        if ($lawarea) {


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
        $lawarea = Lawarea::findOrFail(Crypt::decrypt($id));

        if ($lawarea) {

            return $this->response->noContent();
        }

        return $this->response->errorBadRequest();
    }


}
