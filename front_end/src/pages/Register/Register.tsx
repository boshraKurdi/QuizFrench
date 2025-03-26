import { Container } from 'react-bootstrap'
import './Register.css'
import { Input } from '@components/index'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@hooks/app'
const Register = () => {
    const navigate = useNavigate()
    const { language } = useAppSelector(state => state.language)

    return (
        <section className='reg'>
            <Container>
                <form >
                    <Input type='text' placeholder={language === 'French' ? "nom d'utilisateur" : "اسم المستخدم"} />
                    <Input type='email' placeholder={language === 'French' ? "e-mail" : "الايميل"} />
                    <Input type='password' placeholder={language === 'French' ? "mot de passe" : "كلمة المرور"} />
                    <Input type='password' placeholder={language === 'French' ? "Confirmez le mot de passe" : "تأكيد كلمة المرور"} />
                    <button>{language === 'French' ? "registre" : "تسجيل "}</button>
                </form>
            </Container>
        </section>
    )
}

export default Register
