export type TCourses = {
    data: [
        {
            title: string,
            id: number,
            description: string,
            title_ar: string,
            description_ar: string,
            media: [{
                id: number,
                original_url: string
            }]
        }
    ]
}
export type TCoursesProps = {
    title: string,
    id: number,
    description: string,
    title_ar: string,
    description_ar: string,
    media: [{
        id: number,
        original_url: string
    }]
}