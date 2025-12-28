// import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
// import React, { useEffect, useState } from 'react';
// import { auth } from '../firebase/firebase.init';
// import { AuthContext } from './AuthContext';

// const googleProvider = new GoogleAuthProvider 

// const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)

//     const createUser = (email, password) => {
//         setLoading(true)
//         return createUserWithEmailAndPassword(auth, email, password)
//     }

//     const signInUser = (email, password) =>{
//         return signInWithEmailAndPassword(auth, email, password)
//     }

     
//      const signInWithGoogle = () => {
//         setLoading(true)
//         return signInWithPopup(auth, googleProvider);
//     }
//     const signOutUser = () =>{
//         setLoading(true);
//         return signOut(auth)
//     }
     
//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
//         setUser(currentUser)
//         setLoading(false)
//       })
      
//       return () => {
//         unsubscribe
//       }

//     }, [])

//     const  authInfo = {
//       createUser,
//       signInUser,
//       signInWithGoogle,
//       signOutUser,
//       user,
//       loading
//     }
//     return (
//         <div>
//         <AuthContext value={authInfo}>
//             {children}
//         </AuthContext> 
//         </div>
//     );
// };

// export default AuthProvider;



import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  const registerWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const loginWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerWithEmail,
    loginWithEmail,
    signInWithGoogle,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
