'use client'
import React from 'react'
import { useEffect } from 'react';
import { logOut } from '@/lib/auth';
import { auth } from '@/lib/firebaseConfig';
import axios from 'axios';

const dashboard = () => {

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post("/api/verifyToken");
        console.log("useEffect running");
        if (res.status === 200) {
          console.log("Token is valid");
        }
      } catch (error) {
        console.log("Token is invalid");
        await logOut(auth);
        // Clear the token cookie
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // expires=Thu, 01 Jan 1970 00:00:00 UTC; (this will delete the cookie properly even token also be deleted )
        window.location.href = "/login";
      }
    };
    verifyToken();
  }, []);

  return (
    <div>dashboard</div>
  )
}

export default dashboard