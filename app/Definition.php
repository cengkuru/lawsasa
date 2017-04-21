<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $definition
 * @property integer $term_id
 * @property string $created_at
 * @property string $updated_at
 */
class Definition extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['definition', 'term_id', 'created_at', 'updated_at'];

    public function term(){
        return $this->belongsTo(Term::class,'term_id');
    }

}
