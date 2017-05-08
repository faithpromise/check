<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class TokenLoginController extends Controller {

    public function login(Request $request)
    {

        $token = $request->get('token');

        $token_expires = config('auth.passwords.users.expire');

        $user = User::where('password_reset_token', '=', md5($token))->first();

        if (!$user)
            return response()->json(['error' => 'invalid_token'], 422);

        $is_expired = $user->password_reset_at->addMinutes($token_expires)->isPast();

        if ($is_expired)
            return response()->json(['error' => 'token_expired'], 422);

        /**
         * Destroy reset token
         */
        $user->password_reset_token = null;
        $user->save();

        /**
         * Auto login
         */
        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));

    }

}
