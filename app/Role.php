<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable =['title','display_name','description'];

    public function users (){
        return $this->belongsToMany(User::class);
    }


}
