<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use App\Http\Resources\SurveyQuestionResource;
use DateTime;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [//data which will send to front side
            'id'=> $this->id,
            'image_url'=> $this->image ? URL::to($this->image) : null,
            'title'=> $this->title,
            'slug'=> $this->slug,
            'status'=> $this->status !== 'draft',
            'description'=> $this->description,
            'created_at'=> (new DateTime($this->created_at))->format('Y-m-d H:i:s'),
            'updated_at'=> (new DateTime($this->updated_at))->format('Y-m-d H:i:s'),
            'expire_date'=> $this->expire_date,
            'questions'=> SurveyQuestionResource::collection($this->questions),//relationship with SurveyQuestion
        ];
    }
}
