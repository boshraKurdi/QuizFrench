import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import actDashUpdateCourse from '@store/dashboard/actCourse/actDashUpdateCourse';
import actShowCourse from '@store/course/act/actShowCourse';


function Edit({ userId }: { userId: number, setUserEdited: () => void }) {
    const { course } = useAppSelector(state => state.course)
    const [title, setTitle] = useState(course?.data.title);
    const [description, setDescription] = useState(course?.data.description);
    const [media, setMedia] = useState(course?.data.media[0].original_url);
    const [title_ar, setTitleAra] = useState(course?.data.title_ar);
    const [description_ar, setDescriptionAra] = useState(course?.data.description_ar);
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)
    const addNewUser = () => {
        const formData = new FormData()

        formData.append('title', title as string)
        formData.append('description', description as string)
        formData.append('media', media as string)
        formData.append('title_ar', title_ar as string)
        formData.append('description_ar', description_ar as string)
        const data = {
            formData,
            id: userId
        }
        dispatch(actDashUpdateCourse(data)).unwrap().then(() => {
            language === 'French' ? toast.success('Modifié avec succès!') : toast.success('تم تعديل الكورس !')

        })
    }

    return (
        <div className='user-view _add-view'>
            <h1>{language === 'French' ? "Informations de base" : "المعلومات الأساسية"}</h1> "
            <div className='col-sm-12 col-md-6'>
                <p >
                    <span>{language === 'French' ? "Image" : "الصورة"}</span>

                    <div style={{ position: "relative" }}>
                        <input
                            type="file"
                            className='form-control'
                            placeholder='Enter Password'
                            onChange={e => setMedia(e.target.value)}
                        />

                    </div>
                </p>
            </div>

            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "titre" : "العنوان "}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setTitle(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "titre en arabe" : "العنوان بالعربي"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setTitleAra(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "desctription" : "الوصف "}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setDescription(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "desctription en arabe" : "الوصف بالعربي"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setDescriptionAra(e.target.value)}
                            />
                        </p>
                    </div>

                    <div className='col-sm-12 col-md-6'>
                        <p >
                            <span>{language === 'French' ? "Image" : "الصورة"}</span>

                            <div style={{ position: "relative" }}>
                                <input
                                    type="file"
                                    className='form-control'
                                    placeholder='Enter Password'
                                    onChange={e => setMedia(e.target.value)}
                                />

                            </div>
                        </p>
                    </div>




                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Ajouter un nouveau cours" : "اضافة كورس جديد"}</button>
        </div>
    )
}

export default Edit