<?php

namespace App\Http\Controllers\firebase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Contract\Auth;
use Kreait\Firebase\Exception\AuthException;
use App\Http\Controllers\Controller;
use Kreait\Firebase\Factory;

class FirebaseAuthController extends Controller
{


   
    protected $auth;

    public function __construct(Auth $auth)
    {
        
        $this->auth = $auth;
        //$this->middleware('auth');
    }

    public function signIn(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        try {
            $signInResult = $this->auth->signInWithEmailAndPassword($email, $password);
        $idToken = $signInResult->idToken();
        $userRecord = $this->auth->getUser($signInResult->data()['localId']);
        $firebaseUserId = $userRecord->uid;

        return response()->json(['token' => $idToken, 'firebase_user_id' => $firebaseUserId]);
        } catch (AuthException $e) {
            // TODO: Handle the authentication error
        }
    }

    public function register(Request $request)
{
    $email = $request->input('email');
    $password = $request->input('password');

    try {
        $userProperties = [
            'email' => $email,
            'password' => $password,
        ];
        $createdUser = $this->auth->createUser($userProperties);
        $signInResult = $this->auth->signInWithEmailAndPassword($email, $password);
        $idToken = $signInResult->idToken();
        return response(compact('idToken'));
    } catch (AuthException $e) {
        // TODO: Handle the authentication error
    }
}

// public function logout(Request $request)
// {
//     Log::info('ID token value: ' . $request);
//     $idToken = $request->idToken();
//     Log::info('ID token value: ' . $idToken);
//     $this->auth->revokeRefreshTokens($request->user()->firebase_user_id, $idToken);
//     auth()->logout();
//     // TODO: Redirect the user to the login page
// }

// public function logout(Request $request)
// {
//     $idToken = $request->input('idToken');
//     $this->auth->revokeRefreshTokens($request->user()->firebase_user_id, $idToken);
//     auth()->logout();
//     // TODO: Redirect the user to the login page
// }


}
