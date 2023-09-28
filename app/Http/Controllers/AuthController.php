<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']) // Make sure to hash the password
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();


        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);


        if (!Auth::attempt($credentials, $remember)) {

            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
{
    $user = Auth::user(); // Using the authenticated user from the request
    //$user->currentAccessToken()->delete(); // Use parentheses to call the method
    $user->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out successfully']); // Return a JSON response
}

   public function user(Request $request){
    return $request->user();
   }

}
