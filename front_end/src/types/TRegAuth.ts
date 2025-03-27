export type TRegAuth =
    {
        status: string,
        message?: string,
        user: {
            name: string,
            email: string,
            // updated_at: string,
            // "created_at": "2025-03-26T13:26:20.000000Z",
            id: number
        },
        authorisation: {
            token: string,
            type: string
        }
    }
