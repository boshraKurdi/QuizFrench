<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
            'title' => 'grammaire française',
            'title_ar' => "قواعد اللغة الفرنسية",
            'description' => 'Découvrez les bases de la langue française avec un cours de grammaire complet. Vous apprendrez à construire des phrases, à utiliser les temps et à comprendre correctement la structure grammaticale. Ce cours est idéal pour les débutants et ceux qui souhaitent améliorer leurs compétences en grammaire.',
            'description_ar' => 'اكتشف أساسيات اللغة الفرنسية من خلال دورة شاملة في القواعد. ستتعلم كيفية بناء الجمل، استخدام الأزمنة، وفهم التركيب النحوي بشكل صحيح. هذه الدورة مثالية للمبتدئين ولمن يرغب في تعزيز مهاراته النحوية',
        ]);
        Course::create([
            'title' => "Écoute",
            'title_ar' => "الاستماع",
            "description" => "Le cours d’écoute améliore vos compétences en compréhension orale grâce à une variété de supports audio. Vous écouterez des conversations, des histoires et des extraits de films, vous aidant à améliorer votre capacité à comprendre la langue dans différents contextes.",
            'description_ar' => "تعزز دورة الاستماع مهارات الفهم السمعي لديك من خلال مجموعة متنوعة من المواد السمعية. ستستمع إلى محادثات، قصص، ومقاطع من الأفلام، مما يساعدك على تحسين قدرتك على فهم اللغة في سياقاتها المختلفة"
        ]);
        Course::create([
            'title' => "Audio",
            'title_ar' => " الصوتيات",
            "description" => "Dans le cours de phonétique, vous apprendrez à prononcer correctement les mots français. Nous nous concentrerons sur différents sons, intonations et rythmes, vous permettant d'améliorer votre prononciation et d'accroître votre confiance lorsque vous parlez.",
            'description_ar' => "في دورة الصوتيات، ستتعلم كيفية نطق الكلمات الفرنسية بشكل صحيح. سنركز على الأصوات المختلفة، التنغيم، والإيقاع، مما يمكنك من تحسين نطقك وزيادة ثقتك أثناء التحدث"
        ]);
        Course::create([
            'title' => "conversation",
            'title_ar' => "المحادثة",
            "description" => "Le cours de conversation vise à améliorer vos compétences en français oral. Grâce à des exercices conversationnels et interactifs, vous pourrez pratiquer la langue dans des situations du quotidien et développer votre capacité à vous exprimer couramment.",
            'description_ar' => " تهدف دورة المحادثة إلى تعزيز مهاراتك في التحدث باللغة الفرنسية. من خلال تمارين حوارية وتفاعلية، ستتمكن من ممارسة اللغة في مواقف يومية وتطوير قدرتك على التعبير عن نفسك بطلاقة"
        ]);
        Course::create([
            'title' => "en lisant",
            'title_ar' => "القراءة",
            "description" => "Profitez de la lecture de textes littéraires et culturels dans le cadre du cours de lecture. Ce cours vous aidera à améliorer vos compétences en lecture et en compréhension, en mettant l'accent sur l'analyse de textes et l'exploration des significations plus profondes de la langue française.",
            'description_ar' => " استمتع بقراءة نصوص أدبية وثقافية في دورة القراءة. ستساعدك هذه الدورة على تحسين مهارات القراءة والفهم، مع التركيز على تحليل النصوص واستكشاف المعاني العميقة للغة الفرنسية"
        ]);
    }
}
