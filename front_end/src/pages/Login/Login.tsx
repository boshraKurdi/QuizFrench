import { Input } from '@components/index'
import './Login.css'
import { useAppSelector } from '@hooks/app'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const { language } = useAppSelector(state => state.language)
    const navigate = useNavigate()
    return (
        <section className='login'>
            <Container>
                <form >
                    <Input type='text' placeholder={language === 'French' ? "nom d'utilisateur" : "تسجيل الدخول"} />
                    <Input type='email' placeholder={language === 'French' ? "e-mail" : "الايميل"} />
                    <button>{language === 'French' ? "se connecter" : "تسجيل الدخول"}</button>
                    <p onClick={() => navigate('/register')} >{language === 'French' ? "créer un nouveau compte" : "انشاء حساب جديد"}</p>
                </form>
            </Container>
        </section>
    )
}

export default Login
