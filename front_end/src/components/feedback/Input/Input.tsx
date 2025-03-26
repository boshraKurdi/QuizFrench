import { TInput } from "@customtypes/InputType"
import './Input.css'
const Input = ({ type, placeholder, required, style }: TInput) => {
    return (
        <input className="input" type={type} placeholder={placeholder} required={required} style={style} />
    )
}

export default Input
