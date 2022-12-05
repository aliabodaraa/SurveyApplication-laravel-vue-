<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthApiController extends Controller
{    
    
    public function __construct()
    {
        $this->middleware('jwtauth', ['except' => ['login']]);
    }

    public function store(Request $request)
    {
        $rules=[
            "name"=>"required|min:4",
            "email"=>"required|email|unique:users,email",
            "password"=>["required","confirmed",Password::min(8)->mixedCase()->numbers()->symbols()],
            // "password_confirmation"=>"required|same:password|min:5|max:30",
        ];
        $this->validate($request,$rules);
                //  /** @var \App\Models\User $user */
            $user = User::create(
                [
                    'name'=> $request['name'],
                    'email'=> $request['email'],
                    'password' => bcrypt($request['password']),
                ]
            );
            if($user){
                $token=$user->createToken('main')->plainTextToken;
                return response([
                    'user'=>$user,
                    'token'=>$token
                ]);
            }else{
                return response([
                    'error'=>'The Provided registeration Credentials are not correct'
                ],442);             
            }
    }

public function login(Request $request){
       $this->validate(
            $request,
            ["email"=>"required|email|exists:users,email",
            "password"=>["required",Password::min(8)->mixedCase()->numbers()->symbols()],
            "remember"=>'boolean'
            ],
            ['email.exists'=>'This Email Does not Exist in Users Table'
            ]
        );
    $credentials = $request->all();
    $remember=$request['remember'] ?? false;
    unset($credentials['remember']);//destroy from the assosative array

    if(! $token = JWTAuth::attempt($credentials)){
        return response()->json(['success' => false], 401);
    }
    return response()->json(['success' => true, 'token' => $token],200);
}

public function checkToken(){
    return response()->json(['valid' => auth()->check()]);
}

public function logout(){
    Auth::logout();
    return response()->json(['success' => true],200);
}


}
