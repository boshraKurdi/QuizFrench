<?php

namespace App\Http\Controllers;

use App\Models\Target;
use App\Http\Requests\StoreTargetRequest;
use App\Http\Requests\UpdateTargetRequest;
use App\Models\Certificate;
use App\Models\Level;
use App\Models\Unit;
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
        $level = ['Débutant', 'Intermédiaire', 'Avancé'];
        $level_ar = ['مبتدئ', 'متوسط', 'متقدم'];
        $level_num = 0;
        $level_id = 0;
        $certificate = 0;
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
                    $level_num = 2;
                    $level = app()->getLocale() == 'fa' ? $level[1] : $level_ar[1];
                } else if ($request->degree > 7) {
                    $level_num = 3;
                    $level = app()->getLocale() == 'fa' ? $level[2] : $level_ar[2];
                } else {
                    $level_num = 1;
                    $level = app()->getLocale() == 'fa' ? $level[0] : $level_ar[0];
                }
                $mylevel = Level::whereHas('course', function ($q) use ($request) {
                    $q->where('courses.id', $request->course_id);
                })->where('number', $level_num)->first();
                $level_id = $mylevel ? $mylevel->id : 0;

                Target::where('id', $target->id)->update([
                    'level' => $level_num
                ]);
            }
        }
        if ($request->type == 'unit') {
            $unit_completed = Target::where('user_id', auth()->id())
                ->where('type', 'unit')
                ->where('course_id', $request->course_id)
                ->count();

            $unit_count = Unit::whereHas('level.course', function ($q) use ($request) {
                $q->where('courses.id', $request->course_id);
            })
                ->count();
            $unit_score_total = Target::where('user_id', auth()->id())
                ->where('type', 'unit')
                ->where('course_id', $request->course_id)
                ->sum('degree');
            if ($unit_completed === $unit_count) {
                $c = Certificate::create([
                    'target_id' => $target->id,
                    'average' => intval($unit_score_total / $unit_count) * 10
                ]);
                $certificate = $c->load(['target.course']);
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
            'level' =>  $level_id ? $level : 0,
            'status' => $status,
            'level_id' => $level_id,
            'certificate' => $certificate
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
