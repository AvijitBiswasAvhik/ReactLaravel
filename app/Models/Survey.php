<?php

namespace App\Models;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\SurveyQuestion;

class Survey extends Model
{
    use HasFactory;
    use HasSlug;
    protected $fillable = [ 
        'title',
        'slug',
        'status',
        'image',
        'description',
        'expire_date',
        'user_id',
     ];

     public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(SurveyQuestion::class);
    }
    
}
