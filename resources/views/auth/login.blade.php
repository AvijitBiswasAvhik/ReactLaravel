<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/css/login.css">
    <style>
        .container{
    height: 100vh;
    width :100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
    </style>
    @vite('resources/sass/app.scss','resources/js/app.jsx')
</head>
<body>
    <div class="container">
        <div class="sub-container">
            <div class="form-section">
            <div class="login-header">
                <i class="img"></i>
            </div>
            <div class="login-section">
                <form method="POST" action="{{ route('login') }}">
                    @csrf
                
                    <x-input 
                        id="email" 
                        type="email" 
                        class="input-field" 
                        name="email" 
                        required 
                        autocomplete="email" 
                        autofocus
                        placeholder='Email,Username'
                        value=""
                    />
                    <x-input 
                        id="email" 
                        type="password" 
                        class="input-field" 
                        name="password" 
                        required 
                        autocomplete="" 
                        autofocus
                        placeholder='Password'
                        value=""
                    />
                    <button class="button">Log in</button>

                </form>
                
                
            </div>
            <div class="middle-row">
                <div class="line"></div>
                <div class="text">OR</div>
                <div class="line"></div>
            </div>
            <div class="footer">
                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                
            </div>
            <div class="singup-section">
                Don't have an account? <a href="{{asset('/register')}}"> Sign up </a>
               </div>
           </div>
           
        </div>

    </div>
</body>
</html>
