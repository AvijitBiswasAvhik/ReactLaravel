<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Abort;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rules\Enum;
use App\Enums\QuestionTypeEnum;
use App\Models\SurveyQuestion;
use Hamcrest\Arrays\IsArray;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        // $survey = Survey::find(3);
        // return $survey->questions;
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id', $user->id)->orderBy('created_at', 'DESC')->paginate(2));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        //

        
        $data = $request->validated();
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }
        $data['slug'] = Str::slug($data['title']);
        $survey = Survey::create($data);
        //create new question

        foreach ($data['question'] as $question) {

            $question['survey_id'] = $survey->id;
            // $question = ['survey_id' => $survey->id, $key => $value];

            //return response($question);
            $this->createQuestion($question);
        };


        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request)
    {
        

        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'unauthorized action');
        }
       return new SurveyResource($survey);
        
    }

    public function getBySlug(Survey $survey, Request $request)
    {
        
        //
        if(!$survey->status){
            return response('', 404);
        }
        $currentDate = new \DateTime();
        $expireDate = new \DateTime($survey->expire_date);
        if($currentDate > $expireDate){
            return response('', 404);
        }
        return new SurveyResource($survey);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        
        $data = $request->validated();
        // check if image given and save in local file system
        
       $image = str_replace('http://localhost:8000/','',$data['image']);
        if ($data['image'] && !File::exists($image) && $image != null) {
            
           $relativePath = $this->saveImage($data['image']);
           
            $data['image'] = $relativePath;
            
        }

        if ($survey->image && ($image != str_replace('http://localhost:8000/','',$data['image']))) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
           
        };
        $survey->update($data);
        
        $existingIds = $survey->questions()->pluck('id')->toArray();
        $newIds = Arr::pluck($data['question'], 'id');
        $toDelete = array_diff($existingIds, $newIds);
        $toAdd = array_diff($newIds, $existingIds);
        SurveyQuestion::destroy($toDelete);
        foreach ($data['question'] as $question) {
            if (in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            };
        };
        $questionMap = collect($data['question'])->keyBy('id');
        foreach ($survey->questions as $question) {
            if (isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            };
        };
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unathorize action');
        };
        $survey->delete();

        if ($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        };
        

        
        return response('', 204);
    }

    private function saveImage($image)
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]);

            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            };

            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64 decode failed');
            }
        } else {
            throw new \Exception('didnot match data with url image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);
        return $relativePath;
    }

    //create question
    private function createQuestion($data)
    {
        
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
        
        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => ['required',new Enum(QuestionTypeEnum::class)],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id',
        ]);
        $data = $validator->validated();

        return SurveyQuestion::create($data);
    }

    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        };
        
        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\SurveyQuestion,id',
            'question' => 'required|string',
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => 'nullable|string',
            'data' => 'present',

        ]);
        return $question->update($validator->validated());
    }
}
