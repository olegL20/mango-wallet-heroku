<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class VerifiedListener
{
    public function handle(Verified $event)
    {
        if ($event->user instanceof MustVerifyEmail) {
            $event->user->markEmailAsVerified();
        }
    }
}
