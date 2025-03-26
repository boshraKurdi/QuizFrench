import { TButton } from '@customtypes/buttonType'
import './Button.css'
const Button = ({ children, style, onclick }: TButton) => {
    return (
        <button className='main-btn' style={style} onClick={onclick}>
            {children}
        </button>
    )
}

export default Button
