<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResource;
use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\SurveyQuestion;

class DashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();
        $surveys = Survey::where('user_id', $user->id)->count();
        $latestSurvey = Survey::where('user_id', $user->id)->with('questions')
            ->orderBy('created_at', 'desc')
            ->first();
        $latestQuestion = SurveyQuestion::join('surveys', 'survey_questions.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('survey_questions.created_at', 'desc')
            ->limit(5)
            ->get();
        $totalQuestion = SurveyQuestion::join('surveys', 'survey_questions.survey_id', '=', 'surveys.id')
           ->where('surveys.user_id', $user->id)
           ->count();
        return response(
            [
                'totalSurvey' => $surveys,
                'latestSurvey' => new SurveyResource($latestSurvey),
                'totalQuestion' =>$totalQuestion,
                'latestQuestions' => $latestQuestion

            ]
        );
        
    }
}
