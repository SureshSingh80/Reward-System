"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { useAuth } from "@/lib/AuthContext";
import { auth } from "@/lib/firebaseConfig";
import { logOut } from "@/lib/auth";
import { ModeToggle } from "./ThemeToggle";
import axios from "axios";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  const [isAdminLogin,setIsAdminLogin] = useState(false);

  // for getting query params
  useEffect(() => {
    // get params data from URL
    const queryString = window.location.search;
    // create a searchParams object
    const params = new URLSearchParams(queryString);

    const couponCode = params.get("coupon_code");
    console.log("Navbar couponCode=", couponCode);
    setCouponCode(couponCode);
  });

 

  const handleLogout = () => {
    logOut(auth);
    // Clear the token cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // expires=Thu, 01 Jan 1970 00:00:00 UTC; (this will delete the cookie properly even token also be deleted )
    window.location.href = "/?coupon_code=" + couponCode;
  };

  

  return (
    
    <div className="bg-blue-400 p-3 flex justify-between">
      
      <div className="flex items-center mr-3">
        <Link href="/" className="text-white ml-2">
          <HomeIcon className="text-white" />
        </Link>
      </div>
      {/* logout for user */}
      <div className="flex">
        {user ? (
          <>
            <button
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
              className="mr-3 bg-white text-black px-3 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            
          </>
        )}
        
        
        {/* <ModeToggle /> */}
      </div>
    </div>
  );
};

export default Navbar;
