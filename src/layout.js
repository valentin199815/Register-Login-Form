import {Outlet,Link} from 'react-router-dom';
const Layout = () =>{
    return (
        <>
            <ul>
                <li>
                    <Link to="login">Login</Link>
                </li>
                <li>
                    <Link to="register">Register</Link>
                </li>
            </ul>
            <Outlet/>
        </>
    )
}
export default Layout;