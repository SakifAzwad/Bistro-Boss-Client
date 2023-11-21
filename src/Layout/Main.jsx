import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";


const Main = () => {

    const location=useLocation();
    const check = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div>
            { check || <NavBar></NavBar>}
            <Outlet></Outlet>
            { check || <Footer></Footer>}
        </div>
    );
};

export default Main;