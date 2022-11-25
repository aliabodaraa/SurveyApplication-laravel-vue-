<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Requests\StoreSurveyAnswerRequest;
use Illuminate\Http\Request;
use App\Http\Resources\SurveyResource;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\SurveyQuestion;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestionAnswer;
use Illuminate\Support\Arr;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user=$request->user();
        return SurveyResource::collection(Survey::where('user_id',$user->id)->paginate(3));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {        
        $data=$request->validated();
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }
        $survey = Survey::create($data);

        //Create New Questions
        foreach ($data['questions'] as $question) {
            $question['survey_id']=$survey->id;
            $this->createQuestion($question);
        }

        return new SurveyResource($survey);
    }

    private function createQuestion($data){
        //option (data column) in DB after encodeing
        //{"options":[
            //    {
            //    "uuid":"d00a3d2d-40ab-4565-b53b-f409b09c56ee",
            //    "text":"newasd"
            //    }
         //]
        //}
        if(is_array($data['data'])){//'data'is assosiation array here but is an js Object in frontEnd side
            $data['data']=json_encode($data['data']);//convert assosiation array to json for storing it in DB
        }
        $validator=Validator::make($data,[
            'question'=>'required|string',
            'type'=>['required',Rule::in([
                    Survey::TYPE_TEXT,
                    Survey::TYPE_TEXTAREA,
                    Survey::TYPE_SELECT,
                    Survey::TYPE_RADIO,
                    Survey::TYPE_CHECKBOX
            ])],
            'description'=>'nullable|string',
            'data'=>'present',
            'survey_id'=>'exists:App\Models\Survey,id'
            //or    'survey_id'=>'exists:surveys,id'

        ]);
        return SurveyQuestion::create($validator->validated());
    }

    public function saveImage($image) {
        //check if the image is valid base64 string
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $matchers)){
                  //like data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLk...
            //take out the base64 encoded text without mime type
            $encoded_image = substr($image, strpos($image,',')+1);   
            //get file extension
            $type=strtolower($matchers[1]);
            //check if file is an image
            if(! in_array($type,['jpg','jpeg','gif','png']))
                throw new \Exception('invalid image type');

            $encoded_image = str_replace(' ','+',$encoded_image);
            $decoded_image = base64_decode($encoded_image);
            if($decoded_image == false)
                throw new \Exception('base64 decode faild');

        }else{
            throw new \Exception('did not match data URI with image data');
        }
        $dir='images/';
        $file = Str::random().'.'.$type;
        $relativePath = $dir.$file;
        $absolutePath = public_path($dir);
        if(! File::exists($absolutePath)){
            File::makeDirectory($absolutePath,8755,true);
        }
        file_put_contents($relativePath, $decoded_image);

        return $relativePath;
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey,Request $request)
    { //return $survey->questions->collect();
        $user=$request->user();
        if($user->id !== $survey->user_id)
            return abort(403, 'Unauthorized action .');

        return new SurveyResource($survey);
    }

    public function showForGuest(Survey $survey)
    { 
        return new SurveyResource($survey);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        //return response()->json("DONE Update", 200);
        $data = $request->validated();
        if(isset($data['image'])){
            //first delete the previous image
            if($survey->image){
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
            //add a new image
            $relativePath= $this->saveImage($data['image']);
            $data['image']=$relativePath;
        }

        //if there is an old image , delete it

        
        $survey->update($data);
        //UPDATE QUESTIONS FOR SPESIFIC SURVEY

        //1. Get ids as palin array of existing questions
        $existing_ids=$survey->questions()->pluck('id')->toArray();
        //2. Get ids as palin array of new questions
        $newIds=Arr::pluck($data['questions'],'id');
        //3. find questions to delete
        $toDelete=array_diff($existing_ids,$newIds);
        //4. find questions to add
        $toAdd=array_diff($newIds,$existing_ids);
        //5. delete questions by $toDelete array
        SurveyQuestion::destroy($toDelete);
        //6. Create new questions
        foreach ($data['questions'] as $question) {
            if(in_array($question['id'],$toAdd)){
                $question['survey_id']=$survey->id;
                $this->createQuestion($question);
            }
        }
        //6. Update existing questions
        $questionMap=collect($data['questions'])->keyBy('id');
        foreach ($survey->questions as $question) {
            if(isset($questionMap[$question->id])){
                $this->updateQuestion($question,$questionMap[$question->id]);
            }
        }
        return new SurveyResource($survey);
    }
    private function updateQuestion(SurveyQuestion $question,$data){
        if(is_array($data['data'])){//to verify if the data is existing inside the question
            $data['data']=json_encode($data['data']);//convert assosiation array to json for storing it in DB
        }
        $validator=Validator::make($data,[
            'id'=>'exists:survey_questions,id',
            'question'=>'required|string',
            'type'=>['required',Rule::in([
                    Survey::TYPE_TEXT,
                    Survey::TYPE_TEXTAREA,
                    Survey::TYPE_SELECT,
                    Survey::TYPE_RADIO,
                    Survey::TYPE_CHECKBOX
            ])],
            'description'=>'nullable|string',
            'data'=>'present',
        ]); 
        return $question->update($validator->validated());
    }
    public function storeAnswer(StoreSurveyAnswerRequest $request,Survey $survey){
        $validated = $request->validated();
        $surveyAnswer=SurveyAnswer::create([
            'survey_id'=>$survey->id,
            'start_date'=>date('Y-m-d H:i:s'),
            'end_date' =>date('Y-m-d H:i:s')
        ]);
        foreach($validated['answers'] as $questionId => $answer){//object in vue and assosiative in php
            //verify
            //that the anser comes from the same question and the same survey
            $question=SurveyQuestion::where(['id'=>$questionId,'survey_id'=>$survey->id])->get();
            if(!$question)
                return response("Invalid request ID:'$questionId'",400);

             $data=[
                'survey_question_id'=>$questionId,
                'survey_answer_id'=>$surveyAnswer->id,
                'answer'=>is_array($answer) ? json_encode($answer) : $answer
             ]; 

             SurveyQuestionAnswer::create($data);

        }
        return response("Success",201);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user=$request->user();
        if($user->id !== $survey->user_id)
            return abort(403, 'Unauthorized action .');
        $survey->delete();
        //if there is an old image , delete it
        if($survey->image){
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        return response('', 204);//204 common status code for deletion    
    }
}
