export type TQuiz = {
    data: [
        {
            id: number,
            title: string,
            description: string
            , title_ar: string,
            description_ar: string,
            quiz: [
                {
                    id: number,
                    course_id: number,
                    type: string,
                    question: string,
                    answer_1: string,
                    answer_2: string,
                    answer_3: string,
                    answer_4: string,
                    answer_right: string,
                },

            ]
        }
    ]
}