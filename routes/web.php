<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Professions;
use App\Models\User;
use App\Models\Counters;
use App\Models\Process;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Http\Controllers\CounterController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\QueueTicketController;
use App\Http\Controllers\MonitorController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ServiceAssignmentController;
use Illuminate\Support\Facades\Auth;

Route::get('/', [AuthenticatedSessionController::class, 'index'])->name('login');

Route::get('/login', [AuthenticatedSessionController::class, 'index'])->name('login');

//LOGIN/AUTHENTICATION
Route::post('/authenticate', [AuthenticatedSessionController::class, 'store'])->name('authenticate');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::middleware(['auth'])->group(function () {

    // Admin Users
    Route::get('/admin/users', [AuthenticatedSessionController::class, 'index'])->name('admin.users');
    Route::get('/admin/userManagement', [AuthenticatedSessionController::class, 'userManagement'])->name('admin.userManagement');
    Route::post('/admin/users/store', [AuthenticatedSessionController::class, 'storeUser'])->name('admin.storeUser');
    Route::get('admin/users/{user}/update', [AuthenticatedSessionController::class, 'updateUser'])->name('admin.updateUser');

    // Dashboard

    Route::get('/admin/dashboard', function () {
        return Inertia::render('Dashboard', [

            'processes' => Process::all(),
        ]);
    })->name('dashboard.main');

    // Counters
    Route::get('/admin/counters', [CounterController::class, 'index'])->name('admin.counters');
    Route::post('/admin/counters/store', [CounterController::class, 'store'])->name('admin.counters.store');
    Route::post('/admin/counters/{counter}/update', [CounterController::class, 'update'])->name('admin.counters.update');

    // Departments
    Route::get('/admin/departments', [DepartmentController::class, 'index'])->name('admin.departments');
    Route::post('/admin/departments/store', [DepartmentController::class, 'store'])->name('admin.departments.store');
    Route::put('/admin/departments/{department}', [DepartmentController::class, 'update'])->name('admin.departments.update');

    // Queue Tickets (Receptionist)
    Route::get('/receptionist/queueTickets', [QueueTicketController::class, 'index'])->name('admin.queueTickets');
    Route::get('/receptionist/queueCommandCenter', [QueueTicketController::class, 'commandCenter'])->name('admin.commandCenter');
    Route::get('/receptionist/queueCommandCenter/fetchQueue', [QueueTicketController::class, 'fetchQueue'])->name('admin.commandCenterFetchQueue');
    Route::get('/receptionist/queueCommandCenter/fetchQueueHistory', [QueueTicketController::class, 'fetchQueueHistory'])->name('admin.fetchQueueHistory');
    Route::get('/receptionist/queueCommandCenter/displayServingInMonitor', [QueueTicketController::class, 'displayServingInMonitor'])->name('admin.displayServingInMonitor');
    Route::get('/receptionist/queueCommandCenter/updateCounter', [QueueTicketController::class, 'updateCounter'])->name('admin.updateCounter');
    Route::get('/receptionist/queueCommandCenter/fetchCounter', [QueueTicketController::class, 'fetchCounter'])->name('admin.fetchCounter');

    Route::post('/admin/queueTickets/store', [QueueTicketController::class, 'store'])->name('admin.queueTickets.store');
    Route::post('/admin/queueTickets/displayQueue', [QueueTicketController::class, 'displayQueue'])->name('admin.queueTickets.displayQueue');
    Route::post('/admin/queueTickets/update', [QueueTicketController::class, 'update'])->name('admin.queueTickets.update');

    // Monitors
    Route::get('/admin/monitors', [MonitorController::class, 'index'])->name('admin.monitors');
    Route::post('/admin/monitors/store', [MonitorController::class, 'store'])->name('admin.monitors.store');
    Route::put('/admin/monitors/{monitors}', [MonitorController::class, 'update'])->name('admin.monitors.update');

    // Processes
    Route::get('/admin/processes', [ProcessController::class, 'index'])->name('admin.processes');
    Route::post('/admin/processes/store', [ProcessController::class, 'store'])->name('admin.processes.store');
    Route::put('/admin/processes/{processes}', [ProcessController::class, 'update'])->name('admin.processes.update');

    // Receptionist
    Route::get('/receptionist/serviceAssignments', [ServiceAssignmentController::class, 'index'])->name('receptionist.serviceAssignments');
    Route::post('/receptionist/serviceAssignments/store', [ServiceAssignmentController::class, 'store'])->name('receptionist.serviceAssignments.store');
    Route::put('/receptionist/serviceAssignments/{serviceAssignment}', [ServiceAssignmentController::class, 'update'])->name('receptionist.serviceAssignments.update');
    Route::get('/receptionist/generateQueueTicket', [ServiceAssignmentController::class, 'generateQueueTicket'])->name('receptionist.getQueueTicket');
    Route::get('/receptionist/displayMonitor', [QueueTicketController::class, 'displayMonitor'])->name('receptionist.displayMonitor');

    // Other Test Pages
    Route::get('/testDT', fn() => inertia('Payments/page'))->name('dashboard');
});
