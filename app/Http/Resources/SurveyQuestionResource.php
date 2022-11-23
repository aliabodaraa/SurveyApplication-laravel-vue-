<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SurveyQuestionResource extends JsonResource
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
            'id' =>$this->id,
            'type' =>$this->type,
            'question' =>$this->question,
            'description' =>$this->description,
            'data' =>json_decode($this->data),
        ];
    }
}
//option (data column) in DB after encodeing
// questions=[
//    "data":{
//       "options":[
//               {
//                "uuid":"d00a3d2d-40ab-4565-b53b-f409b09c56ee",
//                "text":"newasd"
//               },
//       ]
//     }
// ]


//{"options":[{"uuid":"b24e5edc-6990-4e45-a467-0989ff3e941d","text":"new111111"},{"uuid":"962770eb-a69f-43b1-b6c2-4315983159b3","text":"new22222"}]}