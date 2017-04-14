<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $interarticle_id
 * @property string $title
 * @property string $description
 * @property string $created_at
 * @property string $updated_at
 * @property Interarticle $interarticle
 * @property Term[] $terms
 */
class Interprovision extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['interarticle_id', 'title', 'description', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function interarticle()
    {
        return $this->belongsTo('App\Interarticle');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function terms()
    {
        return $this->belongsToMany('App\Term');
    }
}
