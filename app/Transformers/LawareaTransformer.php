<?php

namespace App\Transformers;
use Illuminate\Support\Facades\Crypt;
use League\Fractal\TransformerAbstract;
use App\Lawarea;

class LawareaTransformer extends TransformerAbstract
{
    public function transform(Lawarea $lawarea)
    {
        return [
            'id'            => (int) $lawarea->id,
            'secureId'=>Crypt::encrypt($lawarea->id),
            'title'          => $lawarea->title,
            'description'          => $lawarea->description
        ];
    }
}