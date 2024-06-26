<?php
use App\Http\Controllers\AuthApiController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::middleware(['auth:api'])->group(function(){//use auth:api instead of auth:sanctum for stateless authentication
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
//     Route::post('/logout',[AuthApiController::class,'logout']);
//     Route::resource('survey', SurveyController::class);
//     Route::get('/dashboard',[DashboardController::class,'index']);
// });

Route::post('/logout',[AuthApiController::class,'logout']);
Route::resource('survey', SurveyController::class);
Route::get('/dashboard',[DashboardController::class,'index']);
Route::post('/checkToken', [AuthApiController::class,'checkToken']);


Route::get('/survey-by-slug/{survey:slug}',[SurveyController::class,'showForGuest']);
Route::post('/survey/{survey}/answer',[SurveyController::class,'storeAnswer']);


Route::post('/store', [AuthApiController::class,'store']);
Route::post('/login', [AuthApiController::class,'login']);
