<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $title
 * @property string $citation
 * @property string $summary
 * @property string $link
 * @property string $created_at
 * @property string $updated_at
 * @property Term[] $terms
 */
class Caselaw extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'citation', 'summary', 'link', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function terms()
    {
        return $this->belongsToMany('App\Term');
    }
}
