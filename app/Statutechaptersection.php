<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $statutchapter_id
 * @property string $number
 * @property string $provision
 * @property string $created_at
 * @property string $updated_at
 * @property Statutechapter $statutechapter
 */
class Statutechaptersection extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['statutchapter_id', 'number', 'provision', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function statutechapter()
    {
        return $this->belongsTo('App\Statutechapter', 'statutchapter_id');
    }
}
