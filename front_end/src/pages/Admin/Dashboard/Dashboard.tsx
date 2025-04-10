import Header from '@components/Admin/Header/Header'
import SideBar from '@components/Admin/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
    return (
        <>
            <Header />
            <SideBar />
            <Outlet />
        </>
    )
}

export default Dashboard
