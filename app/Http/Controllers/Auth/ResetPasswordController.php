<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class ResetPasswordController extends Controller {

    public function reset(Request $request)
    {

        $password = $request->get('password');

        if (strlen($password) < 8) {
            return response()->json(['error' => 'password_too_short'], 422);
        }

        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['error' => 'user_not_found'], 422);
        }

        $user->password = Hash::make($password);
        $user->save();

        return response()->json(['success' => 'password_reset']);
    }

}
