<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $title
 * @property string $description
 * @property string $created_at
 * @property string $updated_at
 */
class Lawarea extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'description', 'created_at', 'updated_at'];

}
