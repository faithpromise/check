<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller {

    public function login(Request $request)
    {

        $credentials = $request->only('email', 'password');

        /**
         * Require valid email
         */
        $validator = Validator::make($credentials, ['email' => 'required|email']);

        if ($validator->fails()) {
            return response()->json(['error' => 'email_invalid'], 422);
        }

        /**
         * Make sure user exists
         */
        if (!User::whereEmail($credentials['email'])->first()) {
            return response()->json(['error' => 'user_not_found'], 404);
        }

        /**
         * Attempt login
         */
        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $current_time = Carbon::now()->timestamp;

        return response()->json(compact('token', 'current_time'));

    }

}
