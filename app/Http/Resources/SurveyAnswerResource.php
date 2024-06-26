<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SurveyResource;
use DateTime;

class SurveyAnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'survey'=>new SurveyResource($this->survey),
            //while the survey_answers table survey_id  column so you can write here survey directely
            'end_date'=>(new DateTime($this->end_date))->format('Y-m-d H:i:s')
        ];
    }
}
