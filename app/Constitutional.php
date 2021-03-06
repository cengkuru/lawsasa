<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $country_id
 * @property string $constitution
 * @property integer $articles
 * @property string $provision
 * @property string $link
 * @property string $created_at
 * @property string $updated_at
 * @property Country $country
 * @property Term[] $terms
 */
class Constitutional extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['country_id', 'constitution', 'articles', 'provision', 'link', 'created_at', 'updated_at'];

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
    public function terms()
    {
        return $this->belongsToMany('App\Term');
    }
}
