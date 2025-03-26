import { CSSProperties } from "react"

export type TButton = {
    children: string,
    style?: CSSProperties,
    onclick?: () => void
}