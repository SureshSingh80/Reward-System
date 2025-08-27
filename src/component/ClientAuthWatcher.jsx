'use client'
import React, { useEffect } from 'react'
import { getAuth, onIdTokenChanged } from 'firebase/auth'
import axios from 'axios'

const ClientAuthWatcher = () => {

    useEffect(()=>{
        const auth = getAuth();

        // listen for changes in Firebase IDToken
        const unsubscribe =  onIdTokenChanged(auth, async(user) => {
            if(user){
                const token = await user.getIdToken(); // fresh token
                await axios.post('/api/set-token',{token});
            }
            else{
                // clearing cookie
                await axios.post('/api/clear-token');
               
            }
            console.log("Executing onIdTokenChanged");
        });

        return () => unsubscribe();
    },[]);
  return null;
}

export default ClientAuthWatcher;