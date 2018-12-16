<?php

use Illuminate\Http\Request;

Route::post('auth/login', 'Auth\LoginController@login')->name('login');

Route::post('auth/register', 'Auth\RegisterController@register')->name('register');
Route::get('auth/verify', 'Auth\RegisterController@verify')->name('verification.verify');


Route::group(['middleware' => 'jwt.auth'], function(){
    Route::get('user', 'Auth\LoginController@user')->name('user');
    Route::post('auth/logout', 'AuthController@logout')->name('logout');
});

Route::group(['middleware' => 'jwt.refresh'], function(){
    Route::get('auth/refresh', 'AuthController@refresh')->name('refresh');
});
