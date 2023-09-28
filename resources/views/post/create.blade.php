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
            <form method="POST" action="/p/{{$user->id}}/update" enctype="multipart/form-data">
                @csrf
            
                <x-input 
                    id="title" 
                    type="title" 
                    class="input-field" 
                    name="title" 
                    required 
                    autocomplete="title" 
                    autofocus
                    placeholder='title'
                    value=""
                />
                <x-input 
                    id="description" 
                    type="text" 
                    class="input-field" 
                    name="description"  
                    autocomplete="" 
                    autofocus
                    placeholder='description'
                    value=""
                />
                <x-input 
                    id="caption" 
                    type="text" 
                    class="input-field" 
                    name="caption"  
                    autocomplete="" 
                    autofocus
                    placeholder='caption'
                    value=""
                />
                <x-input 
                    id="image" 
                    type="file" 
                    class="input-field" 
                    name="image"  
                    autocomplete="" 
                    autofocus
                    placeholder=""
                    value=""
                />
                <button class="button">Submit</button>

            </form>
        </div>
    </div>
</div>
@endsection