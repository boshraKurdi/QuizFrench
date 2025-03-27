import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import Logo from "../Logo/Logo"
import './Header.css'
import Button from "@components/feedback/Button/Button"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { NavLink, useNavigate } from "react-router-dom"
import { changeLanguageToArabic, changeLanguageToFrench } from "@store/language/language"
import { actLogout } from "@store/auth/authSlice"
const Header = () => {
    const { language } = useAppSelector(state => state.language)
    const { userData } = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const turnFrenchHandler = () => {
        dispatch(changeLanguageToFrench())
    }
    const turnArabicHandler = () => {
        dispatch(changeLanguageToArabic())
    }
    const logoutHandler = () => {
        dispatch(actLogout()).unwrap()
            .then(() => navigate('/'))

    }
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className="cont">
                    <Navbar.Brand href="#home">
                        <Logo />
                    </Navbar.Brand>
                    <Navbar.Toggle className="toggle" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto links">
                            <NavLink to="/">
                                {language === "French" ? "Accueil" : "الرئيسية"}
                            </NavLink>
                            <NavLink to="/courses">
                                {language === "French" ? "Cours" : "الكورسات"}
                            </NavLink>
                            <NavDropdown title={language === "French" ? "langue" : "اللغة"} id="basic-nav-dropdown">
                                <NavDropdown.Item className="drop" >
                                    <p onClick={turnFrenchHandler}>
                                        {language === "French" ? "French" : "فرنسي"}
                                    </p>
                                </NavDropdown.Item>
                                <NavDropdown.Item className="drop">
                                    <p onClick={turnArabicHandler}>
                                        {language === "French" ? "arabe" : " عربي"}

                                    </p>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            {userData ? <div onClick={logoutHandler} className="prof">
                                <img src="" alt="" />
                            </div> :
                                <Button onclick={() => navigate('/login')}>{language === "Arabic" ? "تسجيل الدخول" : "se connecter"}</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
