<?php

Route::get('auth/verify', 'Auth\RegisterController@verify')->name('verification.verify');

Route::get('{all}', function () {
    return view('app');
})->where('all', '^((?!api).)*');
