<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\Counters;
use App\Models\User;
use App\Models\UserLevel;
use App\Models\Counter;
use App\Models\Department;
use App\Models\Process;
use Illuminate\Support\Facades\Log;
use App\Events\UserSessionChanged;

use Illuminate\Support\Facades\DB;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */

    public function index()
    {

        return Inertia::render('Login');
    }

    public function userManagement()
    {

        $users = User::all();
        $userLevels = UserLevel::all();
        return Inertia::render('Admin/Users', ['users' => $users, 'userLevels' => $userLevels]);
    }
    public function create(): Response
    {

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $user = Auth::user();
        $request->session()->regenerate();
        Auth::loginUsingId($user->id);

        $existingSession = DB::table('sessions')
            ->where('user_id', $user->id)
            ->where('id', '!=', session()->getId())
            ->first();

        if ($existingSession) {
            event(new UserSessionChanged($user->id, session()->getId()));
            Log::info("User {$user->id} logged in. Session ID: " . session()->getId() . ' Time is ' . now());
        }

        // Add a timestamp to force a full page reload
        return redirect()->intended('/admin/dashboard')->with([
            // Explicitly share the new CSRF token
            'csrf_token' => csrf_token(),
        ]);
    }
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/'); // <- Fix is here
    }

    public function storeUser(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'user_level' => 'required|integer|exists:user_levels,id',
        ]);

        User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'suffix' => $request->suffix,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_level' => $request->user_level_id,
        ]);

        $users = User::all();
        return redirect()->back()->with([
            'success' => 'User created successfully.',
            'users' => $users
        ]);
    }

    /**
     * Update an existing user.
     */
    public function updateUser(Request $request, $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:20',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'user_level' => 'required|exists:user_levels,id',
        ]);

        $user->update([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'suffix' => $request->suffix,
            'email' => $request->email,
            'user_level' => $request->user_level_id,
        ]);

        return redirect()->back()
            ->with('success', 'User updated successfully');
    }
}
