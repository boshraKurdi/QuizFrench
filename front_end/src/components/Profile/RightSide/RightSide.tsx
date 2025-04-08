import { TProfile } from '@customtypes/profileType'
import './RightSide.css'
import { Tab, Tabs } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import Input from '@components/feedback/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Cookie from 'cookie-universal'
import { useRef, useState } from 'react'
// import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'
import { actChangeProfile, actDeleteAccount } from '@store/user/userSlice'
// import MainBtn from '@components/feedback/Button/Button'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { authLogout } from '@store/auth/authSlice'
const schema = z.object({
    email: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }).email(),
    name: z.string({ required_error: 'required field', invalid_type_error: 'name is required!' }),

});

const RightSide = (props: TProfile) => {
    const { language } = useAppSelector(state => state.language)
    // const toast = useRef<any>(null);
    // const accept = () => {
    //     toast?.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    // }

    // const reject = () => {
    //     toast?.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    // }

    const accept = () => {
        deleteAccountHandler();
        // toast?.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const confirm = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            // reject
        });
    };
    type Inputs = z.infer<typeof schema>;
    type TUser = {
        email: string,
        name: string
    }
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });
    const dispatch = useAppDispatch();
    const data: TUser = {
        email,
        name
    }
    const onSubmit: SubmitHandler<Inputs> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // throw new Error();
            // console.log(data)
            dispatch(actChangeProfile(data))
                .unwrap()
                .then(() => {
                    navigate('/profile')
                })
            setEmail('')
            setName('')

        } catch (error) {
            setError("email", {
                message: 'This email is already taken'
            })
        }
    }
    const levels = props.data?.levels?.map((le, indx) => <li key={indx}>
        {Object.keys(le)} :    {Object.values(le)}

    </li>)
    const rate = props.data?.rate?.map((ra, indx) => <li key={indx}>
        {Object.keys(ra)} :    {Object.values(ra)}

    </li>)
    const cookie = Cookie()
    const deleteAccountHandler = () => {

        dispatch(actDeleteAccount()).unwrap()
            .then(() => {
                navigate('/')
                cookie.remove('token')
                dispatch(authLogout())
            })
    }
    return (
        <div className='rightSide'>
            {/* <Toast ref={toast} /> */}
            <div className="details">
                <Tabs
                    defaultActiveKey="accueil"
                    id="uncontrolled-tab-example"
                    className="mb-3"

                >
                    <Tab eventKey="accueil" title={language === "French" ? "Accueil" : "الرئيسية"}>

                        <h3>{language === "French" ? "compétences et réalisations" : " المهارات والانجازات"}</h3>
                        <h5>
                            {language === "French" ? "Niveaux" : "المستويات"}
                        </h5>
                        <ul>
                            {levels}
                        </ul>
                        <h5>
                            {language === "French" ? "taux" : "المعدل"}
                        </h5>
                        <ul>
                            {rate}
                        </ul>
                    </Tab>
                    <Tab eventKey="profil" title={language === "French" ? "Profil" : "البروفايل"}>
                        <div className="form-details">
                            <h3>{language === "French" ? "changer de profil" : " تغيير البروفايل"}</h3>
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="inp">
                                    <Input reg={register("name")}
                                        onChange={(e) => setName(e.target.value)}
                                        type='text' placeholder={language === 'French' ? "Nom de l'étudiant" : "اسم الطالب"} />
                                    {errors.name && <div className='error'>{errors.name.message}</div>}
                                </div>
                                <div className="inp">
                                    <Input

                                        onChange={(e) => setEmail(e.target.value)}
                                        reg={register("email")} type="email" placeholder={language === 'French' ? "e-mail" : "الايميل"} />
                                    {errors.email && <div className='error'>{errors.email.message}</div>}

                                </div>
                                <button
                                    disabled={isSubmitting}
                                >

                                    {language === 'French' && isSubmitting ? "Chargement..." :
                                        language === 'Arabic' && isSubmitting ? "جاري التحميل..." :
                                            language === 'French' ? "changer" : "تغيير"}</button>
                            </form>
                            <div className="btns">
                                <Button onClick={confirm} label={language === "French" ? "supprimer le compte" : "حذف الحساب "}></Button>

                            </div>
                        </div>

                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default RightSide
