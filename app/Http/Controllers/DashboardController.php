<?php

namespace App\Http\Controllers;
use App\Http\Resources\SurveyResource;
use App\Http\Resources\SurveyAnswerResource;
use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\SurveyAnswer;




class DashboardController extends Controller
{
    public function index(Request $request){
        // Total Number of Surveys

        $user=$request->user();
        $total = Survey::query()->where('user_id', '=', $user->id)->count();

        //Latest Survey

        $latest = Survey::query()->where('user_id', '=', $user->id)
        ->latest('created_at')
        ->first();

        //total Number of Answers
        
        $totalAnswers = SurveyAnswer::query()
        ->join('surveys','survey_answers.survey_id','=','surveys.id')
        ->where('user_id', '=', $user->id)
        ->count();

        //Latest 5 answers
        $latestAnswers = SurveyAnswer::query()
        ->join('surveys','survey_answers.survey_id','=','surveys.id')
        ->where('user_id', '=', $user->id)
        ->orderBy('end_date','DESC')
        ->limit(5)
        ->getModels('survey_answers.*');


        return [
            'totalSurveys'=>$total,
            'latestSurvey'=>$latest ? new SurveyResource($latest) : null,
            'totalAnswers'=>$totalAnswers,
            'latestAnswers'=>SurveyAnswerResource::collection($latestAnswers)
        ];
    }
}
