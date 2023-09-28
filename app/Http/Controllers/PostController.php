<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index(User $user){
        // echo '<pre>';
        // print_r($user->post);
        // echo '</pre>';
        return view('post.create')->with('user', $user);
    }
    //upadate the post table
    public function update(User $user, Request $request)
{
    $data = $request->validate([
        'title' => 'required|string|max:60',
        'description' => 'string|max:1000|min:10',
        'caption' => 'string|max:100',
        'image' => 'image|mimes:jpeg,jpg,png,gif|max:10000',
    ]);
    $image = $request->file('image');
    $imageName = $image->getClientOriginalName();
    $path = $image->store('post', 'public');
    $file = [
        'image_name' => $imageName,
        'image_url' => $path
    ];

    if ($user->post && $path != null ) {
        auth()->user()->post()->create(array_merge($data, $file)); // Assuming you have a 'posts' relationship in the User model
    }
    
    return redirect('/');
}
// view a singlae post
public function view(Post $post) 
{
    return view('post.view')->with('post', $post);
}
}
