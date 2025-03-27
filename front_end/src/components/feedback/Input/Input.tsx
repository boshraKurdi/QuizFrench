import { TInput } from "@customtypes/InputType"
import './Input.css'
const Input = ({ type, placeholder, required, style, reg, onChange }: TInput) => {
    return (
        <input
            {...reg} className="input" type={type} placeholder={placeholder} required={required} onChange={onChange} style={style} />
    )
}

export default Input
