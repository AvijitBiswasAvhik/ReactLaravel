<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Survey;

class SurveyQuestion extends Model
{
    protected $fillable = [
        'survey_id',
        'question',
        'type',
        'data',
        'description'
    ];
    use HasFactory;

    public function surveys(){
        return $this->belongsTo(Survey::class);
    }
}
