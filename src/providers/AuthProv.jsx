/* eslint-disable no-unused-vars */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
    getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,
  } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthCon = createContext(null);

const auth = getAuth(app);
const AuthProv = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading]=useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
  }

    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
      });
  }

    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (newUser) => {
        setUser(newUser);
        
        if (newUser) {
          // get token and store client
          const userInfo = { email: newUser.email };
          axiosPublic.post('/jwt', userInfo)
              .then(res => {
                  if (res.data.token) {
                      localStorage.setItem('access-token', res.data.token);
                      setLoading(false);
                  }
              })
      }
      else {
          // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
          localStorage.removeItem('access-token');
          setLoading(false);
      }
      });
      return () => {
        unSubscribe();
      };
    }, [axiosPublic]);

    const authInfo = { user,loading,createUser,signIn,logOut,updateUserProfile,googleSignIn };
    return <AuthCon.Provider value={authInfo}>{children}</AuthCon.Provider>;
};

export default AuthProv;