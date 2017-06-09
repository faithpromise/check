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

// Projects

Route::get('/projects', 'ProjectsController@index');
Route::get('/projects/{id}', 'ProjectsController@show');
Route::get('/agents', 'AgentsController@index');
Route::post('/projects', 'ProjectsController@store');
Route::put('/projects/{id}', 'ProjectsController@update');
Route::delete('/projects/{id}', 'ProjectsController@destroy');

// Users

Route::get('/users', 'UsersController@index');
Route::get('/users/{id}', 'UsersController@show');
Route::post('/users', 'UsersController@store');
Route::put('/users/{id}', 'UsersController@update');
Route::delete('/users/{id}', 'UsersController@destroy');

// Departments

Route::get('/departments', 'DepartmentsController@index');
Route::get('/departments/{id}', 'DepartmentsController@show');
Route::post('/departments', 'DepartmentsController@store');
Route::put('/departments/{id}', 'DepartmentsController@update');
Route::delete('/departments/{id}', 'DepartmentsController@destroy');

// Comments

Route::post('/comments', 'CommentsController@store');
Route::put('/comments/{id}', 'CommentsController@update');

// Attachments
Route::post('/attachments', 'AttachmentsController@store');
Route::delete('/attachments/{id}', 'AttachmentsController@destroy');
