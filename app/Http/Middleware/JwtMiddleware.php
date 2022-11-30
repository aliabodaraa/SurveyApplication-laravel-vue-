<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Exception;
use Tymon\Auth\Http\Middleware\BaseMiddleware;
use Illuminate\Support\Facades\Auth;
class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

		// try {
    //         return response()->json([ 'valid' => auth()->check() ]);
    //         $user = Auth::parseToken()->authenticate();
    //       } catch (Exception $e) {//return response()->json($e instanceof TokenExpiredException?$e->getMessage():$e->getMessage());
    //            if ($e instanceof TokenExpiredException) {
    //             $newToken=Auth::parseToken()->refresh();
    //          return response()->json(['success' => false, 'status'=>'Expired','token'=>$newToken],401);
    //        }else if ($e instanceof TokenInvalidException){
    //         return response()->json(['success' => false, 'message'=>'token Invalid'],401);
    //     }else if ($e instanceof TokenBlacklistedException){
    //          return response()->json(['status' => 'Token is Blacklisted'], 400);
    //        }else{
    //              return response()->json(['status' => 'Authorization Token not found'], 404);
    //        }
    //      }
             return $next($request);
    }
}
