<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function __construct()
    {
        //return $this->middleware('auth');
    }
    public function edith(User $user){
        $this->authorize('update',  $user->profile);
        return view('/profile/edith')->with('profile', $user->profile);
    }

    public function update(User $user, Request $request)
    {
    $data = $request->validate([
        'name' => 'required|string|max:60',
        'description' => 'required|string|max:1000',
        'url' => 'required|string|max:200',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10000',
    ]);

    // Assuming 'profile' is a relationship on the User model.
    $image = $request->file('image');
    $imageName = $image->getClientOriginalName();
    $path = $image->store('/profile', 'public');
    if ($user->profile && $path != null) {
        $user->profile->update([
            'name' => $data['name'],
            'description' => $data['description'],
            'url' => $data['url'],
            'image_url' => $path,
            'image_name' => $imageName,
        ]);        
    }
    return redirect('/');
}
public function data(Profile $profile){
    return json_encode($profile->all());
}


}
