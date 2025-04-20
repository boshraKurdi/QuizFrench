import { TProfile } from '@customtypes/profileType';
import './LeftSide.css'
import { Button } from 'primereact/button';

import HeadingTitle from '@components/common/HeadingTitle/HeadingTitle';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { actLogout, authLogout } from '@store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal'
import { confirmDialog } from 'primereact/confirmdialog';
const LeftSide = (props: TProfile) => {
    const { language } = useAppSelector(state => state.language)
    const dispatch = useAppDispatch()
    const cookie = Cookie()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(actLogout()).unwrap()
            .then(() => {
                navigate('/')
                cookie.remove('token')
                dispatch(authLogout())
            })
    }
    const accept = () => {
        logoutHandler();
        // toast?.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const confirm = () => {
        confirmDialog({
            message: language === "French" ? 'Voulez-vous vous déconnecter ?' : "هل أنت متأكد أنك تود تسجيل الخروج؟",
            acceptLabel: language === "French" ? "oui" : "نعم",
            rejectLabel: language === "French" ? "non" : "لا",
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            // reject
        });
    };
    return (
        <div className='leftSide'>

            <HeadingTitle>{language === 'French' ? "Profil" : "البروفايل"}</HeadingTitle>

            {/* <div className="top">
                <div className="image">
                    <img src={img} alt="" />
                </div>
            </div> */}
            <div className="bottom">
                <h2>{props?.data?.name!}</h2>
                <p>{props?.data?.email!}</p>
                <p>{language === 'French' ? "classement de l'utilisateur :" : "رتبة المستخدم :"} {props?.data?.user_rank!}</p>
                <div className="top">
                    <h5>{language === 'French' ? "amélioration" : "التطور "}</h5>
                    <h6> {language === 'French' ? "classement utilisateur : " : " تطور الطالب :"}   {props.data?.user_rank}</h6>
                    <p> {language === 'French' ? "niveaux terminées : " : "المستويات المنتهية:"}   {props.data?.completed_levels}</p>
                    <p>{language === 'French' ? "unités terminées : " : "الوحدات المنتهية:"}    {props.data?.completed_units}</p>
                    <p>{language === 'French' ? "leçons terminées : " : "الدروس المنتهية:"}   {props.data?.completed_lessons}</p>
                    <p>{language === 'French' ? "jours série : " : "أيام متتالية:"} {props.data?.streak_days}</p>

                    <div className="btns">
                        <Button onClick={confirm} label={language === "French" ? "déconnexion" : "تسجيل الخروج"}></Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSide
