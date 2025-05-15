'use client'
import { onAuthStateChanged } from "firebase/auth";
import { createContext,useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";


// creating the context
const AuthContext=createContext({
  user:null,
  loading:true
});

// provider component
export function AuthProvider({children}) {
    const [user,setUser]= useState(null);
    const [loading,setLoading]= useState(true);
 

    useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return(
    <AuthContext.Provider value={{user,loading}}>
      {children}
    </AuthContext.Provider>
  );
}

// creating hooks for easier use
export function useAuth() {
  return useContext(AuthContext);
}



