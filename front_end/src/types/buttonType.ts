import { CSSProperties } from "react"

export type TButton = {
    children: React.ReactNode,
    style?: CSSProperties,
    onclick?: () => void,
    disabled?: boolean
}