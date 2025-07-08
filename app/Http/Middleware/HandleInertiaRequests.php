<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request); // Ensures Inertia uses the correct versioning
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => $request->user() ? [
                'user' => [
                    'id' => $request->user()->id,
                    'firstName' => $request->user()->first_name,
                    'middleName' => $request->user()->middle_name ?? null,
                    'lastName' => $request->user()->last_name,
                    'suffix' => $request->user()->suffix ?? null,
                    'fullName' => trim(
                        $request->user()->first_name . ' ' .
                            ($request->user()->middle_name ? $request->user()->middle_name . ' ' : '') .
                            $request->user()->last_name . ' ' .
                            ($request->user()->suffix ?? '')
                    ),
                    'sessionId' => session()->getId(),
                ],
                'sessionId' => session()->getId(),
            ] : null,
        ]);
    }
}
