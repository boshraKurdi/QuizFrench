import { NavLink } from 'react-router-dom'
import './SideBar.css'
import Logo from '@components/common/Logo/Logo'
import { useAppSelector } from '@hooks/app'
const SideBar = ({ show, showHandler }: { show: boolean, showHandler: () => void }) => {
    const { userData } = useAppSelector(state => state.auth)
    return (
        <>

            {<div className={show ? 'side' : "side hide"}>
                <i onClick={showHandler} className='pi pi-times-circle'></i>
                <Logo />
                <div className="details">
                    <h4>{userData?.user.name}</h4>
                    <p>{userData?.user.email}</p>
                </div>
                <div className="links-menu">
                    <div className='menu-item'><NavLink to={'/dashboard/main'}>Main</NavLink></div>
                    <div className='menu-item'><NavLink to={'operations'}>Operations</NavLink></div>
                    <div className='menu-item'><NavLink to={'states'}>Statestics</NavLink></div>
                    <div className='menu-item'>
                        <NavLink to={'settings'}>
                            settings</NavLink></div>
                </div>
            </div>
            }
        </>
    )
}

export default SideBar
