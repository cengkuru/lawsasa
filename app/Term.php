<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

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
 * @property Lawarea[] $lawareas
 */
class Term extends Model
{

    /**
     * @var array
     */
    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $searchable = [
        /**
         * Columns and their priority in search results.
         * Columns with higher values are more important.
         * Columns with equal values have equal importance.
         *
         * @var array
         */
        'columns' => [
            'terms.title' => 10,
            'definitions.definition' => 10,
            'countries.title' => 2
        ],
        'joins' => [
            'countries' => ['countries.id','terms.country_id'],
            'definitions' => ['terms.id','definitions.term_id'],
        ],
    ];
    protected $fillable = ['title', 'created_at', 'updated_at'];

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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function lawareas()
    {
        return $this->belongsToMany('App\Lawarea');
    }

    public function definitions(){
        return $this->hasMany(Definition::class);
    }
}
