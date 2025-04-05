<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Level;
use App\Models\Target;
use App\Models\Unit;
use App\Models\User;
use App\Services\Calculate;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile()
    {
        $user = User::where('id', auth()->id())->first();
        // 1️⃣ عدد الوحدات التي أكملها المستخدم
        $completedUnits = Target::where('user_id', $user->id)
            ->where('type', 'unit')
            ->count();

        // 2️⃣ عدد الدروس المكتملة
        $completedLessons = Target::where('user_id', $user->id)
            ->where('type', 'lesson')
            ->count();

        // 3️⃣ عدد المستويات المكتملة
        $completedLevels = Target::where('user_id', $user->id)
            ->where('type', 'level')
            ->count();



        // 6️⃣ عدد الأيام المتتالية التي درس فيها المستخدم (Streak)
        $streak = Calculate::calculateStreak($user->id);



        // 9️⃣ ترتيب المستخدم بين المتعلمين (Leaderboard)
        $rank = Calculate::getUserRank($user->id);
        $courses = Course::all();
        $levels = [];
        $rate = [];
        foreach ($courses as $c) {
            $level = Target::where('user_id', $user->id)
                ->where('type', 'level')
                ->where('course_id', $c->id)
                ->first();

            $my_level_in_course = $level ? $level->level : 0;

            $levels_in_course = Level::where('course_id', $c->id)->orderBy('number')->get();
            $levels_count = $levels_in_course->count();

            $total_units = 0;
            $completed_units = 0;

            $total_lessons = 0;
            $completed_lessons = 0;

            foreach ($levels_in_course as $level) {
                if ($level->number < $my_level_in_course) {
                    continue; // ⛔ تجاهل المستويات السابقة لمستوى المستخدم
                }

                $units = Unit::where('level_id', $level->id)->get();
                $total_units += $units->count();

                foreach ($units as $unit) {
                    // تحقق من اختبار الوحدة
                    $unit_completed = Target::where('user_id', $user->id)
                        ->where('type', 'unit')
                        ->where('check', $unit->id)
                        ->exists();
                    if ($unit_completed) {
                        $completed_units++;
                    }

                    // تحقق من دروس الوحدة
                    $lesson_ids = Lesson::where('unit_id', $unit->id)->pluck('id')->toArray();
                    $lesson_count = count($lesson_ids);
                    $total_lessons += $lesson_count;

                    if ($lesson_count > 0) {
                        $completed = Target::where('user_id', $user->id)
                            ->where('type', 'lesson')
                            ->whereIn('check', $lesson_ids)
                            ->count();

                        $completed_lessons += $completed;

                        // ✅ إذا كانت هذه آخر وحدة وتم إنهاء دروسها كلها
                        $is_last_unit = $unit->id === $units->last()->id;
                        if ($is_last_unit && $completed == $lesson_count) {
                            $last_unit_completed = true;
                        }
                    }
                }
            }

            // ✅ حساب نسبة التقدم
            $unit_progress = $total_units > 0 ? ($completed_units / $total_units) * 100 : 0;
            $lesson_progress = $completed_lessons > 0 ? ($completed_lessons / ($total_lessons + 1)) * 100 : 0;

            $rate_all = intval($unit_progress + $lesson_progress);

            // ✅ إذا أنهى المستخدم جميع الوحدات والدروس بعد مستواه
            if ($completed_units == $total_units && $total_units > 0) {
                $rate_all = 100;
            }

            // ✅ تحديث المستوى الفعلي (لو أنهى كل وحدات بعد مستواه الحالي)
            if ($completed_units == $total_units && $total_units > 0) {
                $my_level_in_course = $levels_count;
            }

            array_push($levels, ["$c->title" => $my_level_in_course]);
            array_push($rate, ["$c->title" => $rate_all]);
        }


        $user->completed_units = $completedUnits;
        $user->completed_lessons = $completedLessons;
        $user->completed_levels = $completedLevels;
        $user->streak_days = $streak;
        $user->levels = $levels;
        $user->rate = $rate;
        $user->user_rank = $rank;

        // 🔹 تجميع الإحصائيات في مصفوفة وإرسالها للعرض
        return response()->json(['data' => $user]);
    }

    public function update(Request $request)
    {
        User::where('id', auth()->id())->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        return response()->json([
            'message' => app()->getLocale() == 'fa' ? "Profil modifié avec succès" : "تم تعديل الملف الشخصي بنجاح"
        ]);
    }

    public function delete()
    {
        User::where('id', auth()->id())->delete();
        return response()->json([
            'message' => app()->getLocale() == 'fa' ? "Profil supprimé avec succès" : "تم حذف الملف الشخصي بنجاح"
        ]);
    }
}
