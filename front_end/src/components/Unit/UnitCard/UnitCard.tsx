import './UnitCard.css'
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { TUnitProps } from "@customtypes/unitType"
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { confirmDialog } from 'primereact/confirmdialog'
import actDashDeleteUnit from '@store/dashboard/actUnit/actDashDeleteUnit'
import toast from 'react-hot-toast'
import Edit from '@components/Admin/Units/Edit/Edit';
import Button from '@components/feedback/Button/Button'
import { Dialog } from 'primereact/dialog'
import actDashShowVoc from '@store/dashboard/actVocabulary/actDashShowVoc'
const UnitCard = (props: TUnitProps) => {
    const { language } = useAppSelector(state => state.language)
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setselectedUserId] = useState<null | number>(null);
    const { userData } = useAppSelector(state => state.auth)
    const deleteUserConfirm = (userId: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف الكورس' : 'Êtes-vous sûr de vouloir supprimer ce cours ?',
            header: language === 'French' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'French' ? 'oui' : "نعم",
            rejectLabel: language === 'French' ? 'Non' : " لا",
            accept: () => {
                deleteUser(userId)
            },
        });
    }
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const deleteUser = (userId: number) => {
        dispatch(actDashDeleteUnit(userId)).unwrap().then(() => {
            language === 'French' ? toast.success('Supprimé avec succès! ') : toast.success('تم الحذف بنجاح !')

        })
    }
    const { id, idLevel, } = useParams()
    const indx = parseInt(id as string)
    return (
        <div key={props.id} className="lesson-card">
            <div className="lesson-content">
                <div className="lesson-header">
                    <div
                        className={`lesson-icon ${props?.is_locked
                            ? "locked"
                            : props?.id === 100
                                ? "completed"
                                : "active"
                            }`}
                    >
                        {props?.is_locked
                            ? "🔒"
                            : props?.id === 100
                                ? "✓"
                                : "📖"}
                    </div>
                    <h3 className="lesson-title">
                        {language === "French" ? props.title : props.title_ar}
                    </h3>
                </div>

                {!props?.is_locked && (
                    <>
                        {!userData?.user.roles?.length ? <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `10%` }}
                            ></div>
                        </div> : ""}
                        <div
                            style={!!userData?.user.roles?.length ? {
                                justifyContent: 'center'
                            } : {}}
                            className="lesson-footer">
                            {!userData?.user.roles?.length ? <span className="progress-text">
                                {"10"}%{" "}
                                {language === "French" ? "complété" : "مكتمل"}
                            </span> : ""}
                            <button
                                onClick={() =>
                                    navigate(userData?.user.roles?.length ? `/dashboard/courses/${indx}/levels/${idLevel}/units/${props.id}` : `/courses/${indx}/levels/${idLevel}/units/${props.id}`)}
                                className="start-btn">
                                {language === "French" ? "Commencer" : "ابدأ"}
                            </button>
                        </div>
                    </>
                )}
                {
                    userData?.user.roles?.length ?
                        <div className="btns-op">
                            <Button onClick={() => {
                                dispatch(actDashShowVoc(props.id!))
                                setselectedUserId(props.id!)
                                setShowEditMode(true)
                            }
                            }>{language === 'French' ? 'modifier ' : "تعديل "}</Button>
                            <Button onClick={() => {
                                deleteUserConfirm(props.id!)
                            }
                            }>{language === 'French' ? 'supprimer ' : "حذف "}</Button>
                        </div>
                        : ""
                }


                {props?.is_locked && (
                    <div className="locked-message">
                        {language === "French"
                            ? "Leçon verrouillée"
                            : "الدرس مقفل"}
                    </div>
                )}
                <Dialog header={language === "French" ? "modifier " : "تعديل "}
                    visible={showEditMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowEditMode(false)}>

                    <Edit userId={selectedUserId!} setUserEdited={() => {
                        setShowEditMode(false);
                    }} />
                </Dialog>
            </div>
        </div>
        // <div
        //     className={props?.is_locked ? `unitCard` : `unitCard active`}>
        //     <div onClick={() =>
        //         navigate(userData?.user.roles?.length ? `/dashboard/courses/${indx}/levels/${idLevel}/units/${props.id}` : `/courses/${indx}/levels/${idLevel}/units/${props.id}`)} className="text">
        //         <h4> {language === "French" ? props.title : props.title_ar}</h4>
        //         <p>{language === "French" ? props.description : props.description_ar}</p>
        //     </div>
        //     {props?.is_locked &&
        //         <div className="lock">
        //             <Lock style={{ width: '30px', height: '30px' }} />
        //         </div>
        //     }
        //     {
        //         userData?.user.roles?.length ? <div className="btns-op">
        //             <Button onClick={() => {
        //                 dispatch(actDashShowVoc(props.id!))
        //                 setselectedUserId(props.id!)
        //                 setShowEditMode(true)
        //             }
        //             }>{language === 'French' ? 'modifier ' : "تعديل "}</Button>
        //             <Button onClick={() => {
        //                 deleteUserConfirm(props.id!)
        //             }
        //             }>{language === 'French' ? 'supprimer ' : "حذف "}</Button>
        //         </div>
        //             : ""
        //     }

        //     <Dialog header={language === "French" ? "modifier " : "تعديل "}
        //         visible={showEditMode}
        //         style={{ width: '70vw' }}
        //         onHide={() => setShowEditMode(false)}>

        //         <Edit userId={selectedUserId!} setUserEdited={() => {
        //             setShowEditMode(false);
        //         }} />
        //     </Dialog>
        // </div>
    )
}

export default UnitCard
