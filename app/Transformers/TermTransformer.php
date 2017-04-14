<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Term;

class TermTransformer extends TransformerAbstract
{
    public function transform(Term $term)
    {
        return [
            'id'            => (int) $term->id,
            'name'          => ucfirst($term->title),
            'description'          => $term->description,
            'country'=>$term->country,
            'lawarea'=>$term->lawareas
        ];
    }
}