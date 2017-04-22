<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Term;

class TermTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
        'country',
        'lawareas'
    ];
    public function transform(Term $term)
    {
        return [
            'id'            => (int) $term->id,
            'name'          => ucfirst($term->title),
            'description'          => $term->description
        ];
    }

    // Transform country
    public function includeCountry(Term $term){
        if($term->country_id){
            $country = $term->country;
            return $this->item($country,new CountryTransformer());
        }

    }

    // Transform lawarea
    public function includeLawareas(Term $term){
        $lawareas = $term->lawareas;
        return $this->collection($lawareas,new LawareaTransformer());
    }
}