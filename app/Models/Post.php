<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public $fillable = [
        'title',
        'image_name',
        'image_url',
        'caption',
        'description'

    ];
    use HasFactory;
    public function user(){
        return $this->belongsTo(User::class);
    }
}
