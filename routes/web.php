<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;

Route::post('/auth/login', 'Auth\LoginController@login');
//Route::post('/auth/signup', 'Auth\RegisterController@signup');
//Route::post('/auth/verify', 'Auth\RegisterController@verify');
Route::post('/auth/send-token', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('/auth/token-login', 'Auth\LoginController@token_login');
Route::post('/auth/reset-password', ['uses' => 'Auth\ResetPasswordController@reset', 'middleware' => ['jwt.auth']]);

// Attachments

Route::get('api/attachments/{id}/file.{ext}', 'AttachmentsController@download');
Route::get('api/attachments/{id}/thumb.{ext}', 'AttachmentsController@thumb');
Route::get('api/projects/{id}/thumb.{ext}', 'ProjectsController@thumb');

/** @noinspection PhpVoidFunctionResultUsedInspection */
Route::get('{path?}', 'Controller@layout')->where('path', '.+');
