import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthCon } from "../providers/AuthProv";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthCon);
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;