<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profile extends Model
{
    public $fillable = ['name','description','url','image_name','image_url',];
    use HasFactory;
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function profileImage(){
        $image = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
        return $this->image_url == null ? $image : '/storage/'.$this->image_url;
    }
}
