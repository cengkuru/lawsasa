<?php

namespace App\Http\Controllers;

use App\Lawarea;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Term;
use Dingo\Api\Routing\Helpers;
use App\Transformers\TermTransformer;

class TermsController extends Controller
{
    use Helpers;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $terms = Term::all();

        return $this->collection($terms, new TermTransformer);

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\StoreTermRequest $request)
    {
        $term = Term::create($request->all());

        if ($term) {
            // If there is a law areas
            if($request->input('lawarea_id')){
                $term->lawareas()->attach($request->input('lawarea_id'));

            }
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
        //$term = Term::where('id',$id)->get();
        //$term = Term::whereId($id)->get();
        //$term = Term::findOrFail($id);
        $term = Term::where('id',$id)->first();


        if ($term) {

            return $this->item($term, new TermTransformer);
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
    public function update($id,Requests\StoreTermRequest $request)
    {
        $term = Term::findOrFail($id);

        $term->update($request->all());
        if ($term) {
            // Delete previous lawareas
            $term->lawareas()->detach();

            // If there is a law areas
            if($request->input('lawarea_id')){
                $term->lawareas()->attach($request->input('lawarea_id'));

            }
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
        $term = Term::findOrFail($id);

        if ($term) {

            $term->delete();
            return $this->response->noContent();
        }

        return $this->response->errorBadRequest();
    }
}
