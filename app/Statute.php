<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $title
 * @property string $description
 * @property string $created_at
 * @property string $updated_at
 * @property string $links
 * @property Statutechapter[] $statutechapters
 */
class Statute extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'description', 'created_at', 'updated_at', 'links'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function statutechapters()
    {
        return $this->hasMany('App\Statutechapter');
    }
}
