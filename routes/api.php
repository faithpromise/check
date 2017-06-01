<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/projects', 'ProjectsController@index');
Route::get('/projects/{id}', 'ProjectsController@show');
Route::get('/agents', 'AgentsController@index');
Route::get('/users', 'UsersController@index');
Route::get('/users/{id}', 'UsersController@show');
Route::post('/users', 'UsersController@create');
Route::put('/users/{id}', 'UsersController@update');
Route::delete('/users/{id}', 'UsersController@destroy');

// Comments

Route::post('/comments', 'CommentsController@store');
Route::put('/comments/{id}', 'CommentsController@update');

// Attachments

Route::get('/attachments/{id}/thumb.{ext}', 'AttachmentsController@thumb');
Route::post('/attachments', 'AttachmentsController@store');
Route::delete('/attachments/{id}', 'AttachmentsController@destroy');

