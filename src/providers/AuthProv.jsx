/* eslint-disable no-unused-vars */
import {
    getAuth,
  } from "firebase/auth";
import { createContext, useState } from "react";
import { app } from "../firebase/firebase.config";


export const AuthCon = createContext(null);

const auth = getAuth(app);
const AuthProv = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading]=useState(true);




    const authInfo = { user,loading };
    return <AuthCon.Provider value={authInfo}>{children}</AuthCon.Provider>;
};

export default AuthProv;