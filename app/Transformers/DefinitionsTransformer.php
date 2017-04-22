<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Definition;

class DefinitionsTransformer extends TransformerAbstract
{
    public function transform(Definition $definition)
    {
        return [
            'id'=>$definition->id,
            'definition'          => $definition->definition
        ];
    }
}