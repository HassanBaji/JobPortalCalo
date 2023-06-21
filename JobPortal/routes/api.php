<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\firebase\FirebaseAuthController;

use App\Http\Controllers\firebase\UserController;
use App\Http\Controllers\firebase\PostJobController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [FirebaseAuthController::class, 'register']);
Route::post('/signin', [FirebaseAuthController::class, 'signin']);
Route::apiResource('/users', UserController::class);
Route::apiResource('/posts', PostJobController::class);