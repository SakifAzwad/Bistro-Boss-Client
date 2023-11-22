import { useContext } from "react";
import { AuthCon } from "../providers/AuthProv";



const useAuth = () => {
    const auth = useContext(AuthCon);
    return auth;
};

export default useAuth;