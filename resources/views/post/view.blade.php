@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-6 justify-content-center" >
            <div style="height:500px; width:500px overflow:hidden; border-right: 1px solid gray; border-height: 200px; padding:5px">
                <img src="/storage/{{$post->image_url}}" class="" style="max-height:100%; max-width:100%; object-fit: cover">
            </div>
            </div>
            
        <div class="col-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-6 justify-content-right" >
                      <div style="height: 50px; width:50px; overflow:hidden">
                        <img 
                            src="/storage/{{$post->user->profile->image_url}}" 
                            class="" 
                            style="height:100%; width:100%; object-fit:cover; border-radius: 50%"
                        >
                      </div>
                    </div>
                    <div class="col-6 text-left">
                        <h5>{{ $post->user->profile->name}}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        {{$post->user->profile->description}}
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection