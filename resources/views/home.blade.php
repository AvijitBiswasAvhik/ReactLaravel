@extends('layouts.app')
<link rel="stylesheet" href="/css/home.css">
@section('content')
<pre>
@php 

@endphp
</pre>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-sm-4 p-2">
            <div class="profile-img">
                <div class="image-contain"><img src="{{$data->profile->profileImage()}}" alt="" class="img"></div>
            </div>
        </div>
        <div class="col-sm-4 p-2 ">
            <div class="profile-content ">
                <div class="profile-header" style="">
                    <h3>{{$data->profile->name}}</h3> 
                    <div id="react-button">
                        
                    </div>
                    @can('update', $data->profile)
                    <a href="/profile/{{$data->id}}/edith"><button class="btn btn-primary">edith profile</button></a>
                    @endcan
                </div>
                <div class="profile-footer ">
                    <div class="description">
                        <p>
                           {{$data->profile->description}} <a href="{{$data->profile->url}}">{{$data->profile->url}}</a> 
                        </p>
                    </div>
                    <div class="inform">
                        <div class="post-count"><strong>{{count($data->post)}}</strong> post</div>
                        <div class="follower"><strong>123</strong>follower</div>
                        <div class="following"><strong>123</strong>following</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Start post Section-->
    <div class="row justify-content-center post-section p-3 mt-2"> 
        <div class="create-post">
            <a href="/p/{{$data->id}}/create">
            <button>Create <span>+</span></button>
            </a>
        </div>
        @if(count($data->post) > 0)
        
        @foreach ($data->post as $post)
        <div class="col-sm-4 p-2">
            <a href="p/{{$post->id}}/view">
            <div class="post-image">
               
                <img src="/storage/{{$post->image_url}}" alt="" class="w-100">
            </div>
        </a>
        </div>
        @endforeach
        @endif
    </div>


</div>
<footer class="footer mt-auto py-3 bg-light">
    <div class="container text-center">
      <span class="text-muted">Your Company &copy; 2023. All rights reserved.</span>
    </div>
  </footer>
@endsection