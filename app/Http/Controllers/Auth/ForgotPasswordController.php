<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;

use App\Notifications\ResetPassword;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller {

    public function sendResetLinkEmail(Request $request)
    {

        $validator = Validator::make($request->only('email'), ['email' => 'required|email']);

        if ($validator->fails()) {
            return response()->json(['error' => 'email_invalid'], 422);
        }

        /**
         * Make sure user exists for given email
         */
        if (!$user = User::whereEmail($request->get('email'))->first()) {

            // TODO: If an agent with that email exists, and has a user
            // return error that account is under a different email
            // address.

            return response()->json(['error' => 'user_not_found'], 404);
        }

        $token = hash_hmac('sha256', Str::random(40), config('app.key'));
        $user->password_reset_token = md5($token);
        $user->password_reset_at = Carbon::now();
        $user->save();

        try {
            Notification::send($user, new ResetPassword($token));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return response()->json(['success' => 'email_sent']);

    }

}
