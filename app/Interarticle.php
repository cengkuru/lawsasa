<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $title
 * @property string $created_at
 * @property string $updated_at
 * @property Interprovision[] $interprovisions
 */
class Interarticle extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function interprovisions()
    {
        return $this->hasMany('App\Interprovision');
    }
}
