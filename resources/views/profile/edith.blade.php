@extends('layouts.app')
@section('content')
<link rel="stylesheet" href="/css/login.css">
<div class="containers">
    <div class="sub-container">
        <div class="form-section">
        <div class="login-header">
            <i class="img"></i>
        </div>
        <div class="login-section">
            <form method="POST" action="/profile/{{$profile->id}}/update" enctype="multipart/form-data">
                @csrf
            
                <x-input 
                    id="name" 
                    type="name" 
                    class="input-field" 
                    name="name" 
                    required 
                    autocomplete="name" 
                    autofocus
                    placeholder='name'
                    value="{{$profile->name}}"
                />
                <x-input 
                    id="description" 
                    type="text" 
                    class="input-field" 
                    name="description"  
                    autocomplete="" 
                    autofocus
                    placeholder='description'
                    value="{{$profile->description}}"
                />
                <x-input 
                    id="url" 
                    type="text" 
                    class="input-field" 
                    name="url"  
                    autocomplete="" 
                    autofocus
                    placeholder='url'
                    value="{{$profile->url}}"
                />
                <x-input 
                    id="file" 
                    type="file" 
                    class="input-field" 
                    name="image"  
                    autocomplete="" 
                    autofocus
                    placeholder='image'
                    value=""
                />
                <button class="button">Submit</button>

            </form>
        </div>
    </div>
</div>
          
@endsection