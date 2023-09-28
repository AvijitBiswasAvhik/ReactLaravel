<?php

namespace App\Http\Resources;
use Carbon\Carbon;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use App\Http\Resources\SurveyQuestionResource;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'image' => $this->image ? URL::to($this->image) : null,
            'description' => $this->description,
            'status' => !!$this->status,
            'created_at' => $this->created_at->format('d-m-Y H:i:s'),
            'updated_at' => $this->updated_at->format('d-m-Y H:i:s'),
            'expire_date' => Carbon::parse($this->expire_date)->format('Y-m-d'),//,$this->expire_date->format('d-m-Y H:i:s'),
            'question'=>SurveyQuestionResource::collection($this->questions),
            
        ];
        
    }
}
