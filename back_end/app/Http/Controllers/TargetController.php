<?php

namespace App\Http\Controllers;

use App\Models\Target;
use App\Http\Requests\StoreTargetRequest;
use App\Http\Requests\UpdateTargetRequest;
use Illuminate\Support\Facades\Auth;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTargetRequest $request)
    {
        $level = 0;
        $status =  app()->getLocale() == 'fa' ? 'réussi' : "ناجح";
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $request->course_id)
            ->where('check', $request->check)
            ->where('type', $request->type)
            ->count();
        $check_level = Target::where('user_id', auth()->id())
            ->where('course_id', $request->course_id)
            ->where('type', $request->type)
            ->count();
        if (!$check) {
            if ($request->degree > 5 && $request->type != 'level') {
                $target = Target::create([
                    'user_id' => auth()->id(),
                    'course_id' => $request->course_id,
                    'check' => $request->check,
                    'type' => $request->type,
                    'degree' => $request->degree
                ]);
            }
            if (!$check_level && $request->type == 'level') {
                $target = Target::create([
                    'user_id' => auth()->id(),
                    'course_id' => $request->course_id,
                    'check' => 0,
                    'type' => $request->type,
                    'degree' => $request->degree
                ]);
                if ($request->degree > 3) {
                    $level = 2;
                } else if ($request->degree > 7) {
                    $level = 3;
                } else {
                    $level = 1;
                }

                Target::where('id', $target->id)->update([
                    'level' => $level
                ]);
            }
        }

        if ($request->degree > 5) {

            $message = app()->getLocale() == 'fa' ? "Votre travail acharné commence à porter ses fruits, continuez !💪🏻" : "عملك الجاد بدأ يؤتي ثماره، استمر في التقدم!💪🏻";
        } else if ($request->degree == 10) {
            $message = app()->getLocale() == 'fa' ? "Bravo! Votre réussite est le fruit de votre travail acharné, continuez à briller !🥳" : "مبروك! إنجازك هو ثمرة اجتهادك، استمر في التألق!🥳";
        } else {
            $status = app()->getLocale() == 'fa' ? "Échoué" : "راسب";
            $message = app()->getLocale() == 'fa' ? "Chaque échec est un pas vers le succès, apprenez et recommencez !😢" : "كل فشل هو خطوة نحو النجاح، تعلم وابدأ من جديد!😢";
        }



        return response()->json(['message' => $message, 'data' => [
            'level' => $level,
            'status' => $status
        ]]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Target $target)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTargetRequest $request, Target $target)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Target $target)
    {
        //
    }
}
