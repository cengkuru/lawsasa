<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $title
 * @property string $created_at
 * @property string $updated_at
 * @property Constitutional[] $constitutionals
 * @property Term[] $terms
 */
class Country extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function constitutionals()
    {
        return $this->hasMany('App\Constitutional');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function terms()
    {
        return $this->hasMany('App\Term');
    }
}
