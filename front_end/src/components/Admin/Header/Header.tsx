import './Header.css'
import Navbar from '../Navbar/Navbar';
import { Container } from 'react-bootstrap';
const Header = () => {
    return (
        <header>
            <Container>
                <Navbar />
            </Container>
        </header>
    )
}

export default Header
