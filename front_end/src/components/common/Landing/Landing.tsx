import Button from '@components/feedback/Button/Button'
import './Landing.css'
import france from '@assets/imgs/france2.jpg'
import { useAppSelector } from '@hooks/app'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
const Landing = () => {
    const { language } = useAppSelector(state => state.language)
    const navigate = useNavigate()
    return (
        <div className='landing'>
            <Container className='land'>
                <div className="text">
                    <h2>
                        {language === "French" ? "  APPRENEZ le français avec nous de la manière la plus simple !" : "تعلم الفرنسية معنا بأسهل طريقة!"}
                    </h2>
                    <div className='btn'>
                        <Button onclick={() => navigate('/login')}>{language === "French" ? "commencer" : "ابدأ"}</Button>
                    </div>                </div>

                <div className="pic">
                    <img src={france} alt="" />
                </div>
            </Container>
        </div>
    )
}

export default Landing
