import { Container } from 'react-bootstrap'
import './Certificate.css'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import actGetCertificate from '@store/user/act/actGetCertificate'
const Certificate = () => {
    const { userData } = useAppSelector(state => state.auth)
    const { language } = useAppSelector(state => state.language)
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const indx = parseInt(id as string)
    useEffect(() => {
        dispatch(actGetCertificate(indx))

    }, [])
    return (
        <div className="certificate">
            <Container className='cont'>
                <div className="box">
                    <h1>{language === "French" ? "Certificat" : "شهادة"}</h1>
                    <h3 className="name">{userData?.user.name}</h3>
                    <div className="name">{userData?.user.email}</div>
                    <div className="name">{userData?.user.id}</div>
                </div>
            </Container>
        </div>
    )
}

export default Certificate
