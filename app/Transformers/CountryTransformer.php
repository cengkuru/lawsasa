<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Country;

class CountryTransformer extends TransformerAbstract
{
    public function transform(Country $country)
    {
        return [
            'id'            => (int) $country->id,
            'name'          => ucfirst($country->title)
        ];
    }
}