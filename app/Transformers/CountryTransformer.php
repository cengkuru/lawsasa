<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Country;

class CountryTransformer extends TransformerAbstract
{
    public function transform(Country $country)
    {
        return [
            'name'          => $country->title
        ];
    }
}