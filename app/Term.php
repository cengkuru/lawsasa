<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $country_id
 * @property string $title
 * @property string $description
 * @property string $created_at
 * @property string $updated_at
 * @property Country $country
 * @property Blog[] $blogs
 * @property Book[] $books
 * @property Caselaw[] $caselaws
 * @property Constitutional[] $constitutionals
 * @property Interprovision[] $interprovisions
 */
class Term extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['country_id', 'title', 'description', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function country()
    {
        return $this->belongsTo('App\Country');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function blogs()
    {
        return $this->belongsToMany('App\Blog');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function books()
    {
        return $this->belongsToMany('App\Book');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function caselaws()
    {
        return $this->belongsToMany('App\Caselaw');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function constitutionals()
    {
        return $this->belongsToMany('App\Constitutional');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function interprovisions()
    {
        return $this->belongsToMany('App\Interprovision');
    }
}
