<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Userprofile extends Model
{
    use SoftDeletes;
    protected $fillable=['user_id','imageurl','tel','address'];
    #default imageurl  mutator
    public function setImageurlAttribute($value){
        if($value){
            $this->attributes['imageurl']=$value;

        }else{
            $this->attributes['imageurl']='build/images/avatar.png';
        }

    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
