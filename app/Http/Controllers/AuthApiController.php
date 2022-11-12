<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthApiController extends Controller
{

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
    //$cerdentials = $request->only('email','password');
    $cerdentials = $request->all();
    $remember=$request['remember'] ?? false;
    unset($cerdentials['remember']);//destroy from the assosative array
    if( Auth::guard('web')->attempt($cerdentials,$remember) ){
        $user=Auth::user();
        $token=$user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }else{
        return response([
            'error'=>'The Provided Credentials are not correct'
        ],442);  
    }
}
public function logout(){
    // Auth::user()->tokens->each(function($token) {
    //     $token->delete();
    // });
//Auth::logout();

Auth::user()->currentAccessToken()->delete();
return response()->json('Successfully logged out');

} 
}
