export type TUnit = {
    data: [
        {
            id: number,
            title: string,
            description: string,
            title_ar: string,
            description_ar: string,
            course_level_id: number,
            is_locked: boolean,
        },

    ]
}
export type TUnitProps = {
    id: number,
    title: string,
    description: string,
    title_ar: string,
    description_ar: string,
    course_level_id: number,
    is_locked: boolean,
    num?: string
}