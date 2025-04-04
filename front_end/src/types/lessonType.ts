export type TLesson = {
    data: [
        {
            id: number,
            title: string,
            unit_id: number,
            content: string,
            title_ar: string
            content_ar: string
            objective: string,
            objective_ar: string,
            video_url: string | null,

            is_locked: string,
            vocabulary: [
                {
                    id: number,
                    lesson_id: number,
                    word: string,
                    translation: string,
                    example_sentence: string,
                    audio_url: string | null,
                },

            ]
        },

    ]
}
export type TLessonProps = {
    id: number,
    title: string,
    unit_id: number,
    content: string,
    title_ar: string
    content_ar: string
    objective: string,
    objective_ar: string,
    video_url: string | null,

    is_locked: string,
    vocabulary: [
        {
            id: number,
            lesson_id: number,
            word: string,
            translation: string,
            example_sentence: string,
            audio_url: string | null,
        },

    ]
}