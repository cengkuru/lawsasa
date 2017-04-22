<?php

namespace App\Http\Controllers;

use App\Definition;
use App\Lawarea;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Term;
use Dingo\Api\Routing\Helpers;
use App\Transformers\TermTransformer;
use Illuminate\Support\Facades\Crypt;

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
            // If there definitions
            if($request->input('description')){
                foreach ($request->input('description') as $key => $value) {
                    $data = array(
                        'term_id'=>$term->id,
                        'definition'=>$value
                    );
                    Definition::create($data);
                }
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
        $term = Term::where('id',Crypt::decrypt($id))->first();


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
        $term = Term::findOrFail(Crypt::decrypt($id));

        $term->update($request->all());
        if ($term) {
            // If there definitions
            if($request->input('description')){
                // Delete all definitions for term
                Definition::where('term_id',$term->id)->delete();
                foreach ($request->input('description') as $key => $value) {
                    $data = array(
                        'term_id'=>$term->id,
                        'definition'=>$value
                    );
                    Definition::create($data);
                }
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
        $term = Term::findOrFail(Crypt::decrypt($id));

        if ($term) {
            // Delete all definitions for term
            Definition::where('term_id',$term->id)->delete();

            $term->delete();
            return $this->response->noContent();
        }

        return $this->response->errorBadRequest();
    }

    public function searchForTerm($term){
        $terms = Term::where('title', 'LIKE', '%'.$term.'%')->get();

        return $this->collection($terms, new TermTransformer);
    }
}
