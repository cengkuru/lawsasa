<?php

namespace App\Transformers;

use Illuminate\Support\Facades\Crypt;
use League\Fractal\TransformerAbstract;
use App\Term;

class TermTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
        'country',
        'lawareas',
        'definitions'
    ];
    public function transform(Term $term)
    {
        return [
            'id'            => (int) $term->id,
            'secureId'=>Crypt::encrypt($term->id),
            'title'          => $term->title
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

    // Transform Definitions
    public function includeDefinitions(Term $term){
        $definitions = $term->definitions;
        return $this->collection($definitions, new DefinitionsTransformer());
    }
}