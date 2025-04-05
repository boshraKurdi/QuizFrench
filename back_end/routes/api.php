<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\QuizlessonController;
use App\Http\Controllers\QuizunitController;
use App\Http\Controllers\TargetController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout'])
        ->middleware('auth:api');
    Route::post('refresh', [AuthController::class, 'refresh'])
        ->middleware('auth:api');
});
Route::group(['prefix' => 'home'], function () {
    Route::get('GetCourses', [CourseController::class, 'index']);
    Route::get('ShowCourse/{id}', [CourseController::class, 'show']);
});
Route::group(['middleware' => 'auth:api'], function () {
    Route::group(['prefix' => 'course'], function () {
        Route::get('QuizLevel/{id}', [CourseController::class, 'quiz_level']);
        Route::get('GetUnits/{id}', [CourseController::class, 'get_unit_course_level']);
        Route::get('GetLessons/{id}', [CourseController::class, 'get_lesson']);
    });
    Route::group(['prefix' => 'unit'], function () {
        Route::get('QuizUnit/{id}', [QuizunitController::class, 'quiz_unit']);
    });
    Route::group(['prefix' => 'lesson'], function () {
        Route::get('QuizLesson/{id}', [QuizlessonController::class, 'quiz_lesson']);
    });
    Route::group(['prefix' => 'progress'], function () {
        Route::post('AddProgress', [TargetController::class, 'store']);
    });
    Route::group(['prefix' => 'user'], function () {
        Route::get('profile', [UserController::class, 'profile']);
        Route::post('update', [UserController::class, 'update']);
        Route::delete('delete', [UserController::class, 'delete']);
    });
});
