<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $title
 * @property string $author
 * @property string $excerpt
 * @property string $link
 * @property string $created_at
 * @property string $updated_at
 * @property Term[] $terms
 */
class Blog extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'author', 'excerpt', 'link', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function terms()
    {
        return $this->belongsToMany('App\Term');
    }
}
