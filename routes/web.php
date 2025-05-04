<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessagesController;

// Broadcast::routes(['middleware' => ['auth']]);
Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/chat', function () {
        return Inertia::render('Chat');
    })->name('chat');
    Route::post('/send-message', [MessagesController::class, 'sendMessage'])->name('messages.send');
    Route::post('/messages', [MessagesController::class, 'loadMessages'])->name('messages.load');
    Route::post('/messages/older', [MessagesController::class, 'loadOlderMessages'])->name('messages.loadOlder');

});

require __DIR__ . '/auth.php';
