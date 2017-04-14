<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Lawarea;

class LawareaTransformer extends TransformerAbstract
{
    public function transform(Lawarea $lawarea)
    {
        return [
            'id'            => (int) $lawarea->id,
            'name'          => $lawarea->title,
            'description'          => $lawarea->description
        ];
    }
}