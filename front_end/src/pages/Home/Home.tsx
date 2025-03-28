import Landing from "@components/common/Landing/Landing"
import Cookie from 'cookie-universal'
const Home = () => {
    const cookie = Cookie()
    console.log(cookie.get("token"))
    return (
        <>
            <Landing />
        </>
    )
}

export default Home
