<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $statute_id
 * @property string $number
 * @property string $created_at
 * @property string $updated_at
 * @property Statute $statute
 * @property Statutechaptersection[] $statutechaptersections
 */
class Statutechapter extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['statute_id', 'number', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function statute()
    {
        return $this->belongsTo('App\Statute');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function statutechaptersections()
    {
        return $this->hasMany('App\Statutechaptersection', 'statutchapter_id');
    }
}
