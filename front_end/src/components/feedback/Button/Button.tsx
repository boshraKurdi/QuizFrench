import { TButton } from '@customtypes/buttonType'
import './Button.css'
const Button = ({ children, style, onclick, disabled }: TButton) => {
    return (
        <button disabled={disabled} className='main-btn' style={style} onClick={onclick}>
            {children}
        </button>
    )
}

export default Button
