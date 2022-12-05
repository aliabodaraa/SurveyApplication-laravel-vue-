<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Exception;
use Tymon\Auth\Http\Middleware\BaseMiddleware;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
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
        try{
            $user = JWTAuth::parseToken()->authenticate();
        }catch (Exception $e) {
          if($e instanceof \PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException){
                  $newToken=JWTAuth::parseToken()->refresh();
                  return response()->json(['success' => false, 'status'=>'Expired','token'=>$newToken],200);
          }elseif($e instanceof \PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException)
                  return response()->json(['success' => false, 'message'=>'token Invalid'],401);
            else
                  return response()->json(['success' => false, 'message'=>'Token not found'], 401);
        }

        return $next($request);
    }
}
