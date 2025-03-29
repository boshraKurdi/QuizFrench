export type TLevel = {
    id: number,
    title: string,
    title_ar: string,
    description_ar: string
    description: string,
    is_locked?: boolean,
    pivot?: {
        course_id: number,
        level_id: number
    }
    num?: number
}