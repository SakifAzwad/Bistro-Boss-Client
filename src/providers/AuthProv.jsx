/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword,
    getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,
  } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";


export const AuthCon = createContext(null);

const auth = getAuth(app);
const AuthProv = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading]=useState(true);

    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };

    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (newUser) => {
        setUser(newUser);
        setLoading(false);
      });
      return () => {
        unSubscribe();
      };
    }, []);

    const authInfo = { user,loading,createUser,signIn,logOut };
    return <AuthCon.Provider value={authInfo}>{children}</AuthCon.Provider>;
};

export default AuthProv;