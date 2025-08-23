'use client'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { logOut } from '@/lib/auth';
import { auth } from '@/lib/firebaseConfig';
import axios from 'axios';
import Loader from '@/component/Loader';
import { ToastContainer } from 'react-toastify';
import CustomerToolBar from '@/component/CustomerToolBar';
import { useAuth } from '@/lib/AuthContext';

const dashboard = () => {


   // finding email from firebase 
    const { user ,loading } = useAuth();
   
    
  //  const [loading, setLoading] = useState(true);
    const [claimedCoupon, setClaimedCoupon] = useState([]);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post("/api/verifyToken");
        console.log("useEffect running");
        if (res.status === 200) {
          console.log("Token is valid");
        }
      } catch (error) {
        console.log("Error in verficatoin=",error.response.data);

        await logOut(auth);
        // Clear the token cookie
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // expires=Thu, 01 Jan 1970 00:00:00 UTC; (this will delete the cookie properly even token also be deleted )
        window.location.href = "/login";
      }
    };
    verifyToken();
  }, []);

  // useEffect for fetching claimed coupon
  useEffect(()=>{
          const fetchClaimedCoupon = async () => {
                    try {
                        const res = await axios.get('/api/fetch-claimed-coupon?email=' + user.email);
                        console.log("claimed coupon response", res.data.message);
                        setClaimedCoupon(res.data.message);
                    } catch (error) {
                        console.log(error);
                    }
          }

          if(user && !loading && user.email){
           fetchClaimedCoupon();
       }
  },[user]);

  return (

    <div>
       <h2>Hello</h2>
    </div>
  //  <>
  //     {loading ? (
  //       <Loader />
  //     ) : (
  //       <div
  //         className={`flex flex-col  items-center  min-h-screen bg-gray-200 px-4 text-black     }`} 
  //       >
  //         <ToastContainer />
          
  //         {/* Toolbar Container for searching sorting and filter */}
  //        <CustomerToolBar/>
         
  //         {coupons && coupons.length > 0 ? (
  //           coupons.map((coupon) => (
  //             <div key={coupon._id} className="w-full">

                
  //               {/* coupon card */}
  //               <div  className="bg-gray-100 w-full  p-4 shadow-lg flex flex-col justify-center mt-4 transition-all duration-200 hover:shadow-md hover:scale-101 cursor-pointer">
  //                 {/* first row */}
  //                 <div className="flex flex-row justify-between">
  //                   <div className="flex ">
  //                     <span
  //                       className="material-symbols-outlined mr-2 text-blue-900"
  //                       style={{ fontSize: "20px" }}
  //                     >
  //                       featured_seasonal_and_gifts
  //                     </span>

  //                     <span
  //                       className="font-mono font-semibold"
  //                       style={{ fontSize: "16px" }}
  //                     >
  //                       {coupon.couponCode}
  //                     </span>

  //                     <span className="ml-2 relative" style={{bottom: "1px"}}>
  //                       {copiedId === coupon._id ? (
  //                         <DoneAllIcon sx={{ fontSize: 15 }} />
  //                       ) : (
  //                         <ContentCopyIcon
  //                           sx={{ fontSize: 13 }}
  //                           className="cursor-pointer"
  //                           onClick={() =>
  //                             handleCopy(coupon.couponCode, coupon._id)
  //                           }
  //                         />
  //                       )}
  //                     </span>
  //                   </div>

  //                   {coupon.isClaimed ? (
  //                     <div className=" flex items-center justify-center text-red-500 bg-red-100 rounded-full text-xs font-semibold  px-2">
  //                       Redeemed
  //                     </div>
  //                   ) : (
  //                     <div className=" flex items-center justify-center text-green-500 bg-green-100 rounded-full text-xs font-semibold  px-2">
  //                       Available
  //                     </div>
  //                   )}
  //                 </div>

  //                 {/* second row */}
  //                 <div className="flex flex-row justify-between mt-4">
  //                   <div className="flex bg-blue-100 text-blue-500 rounded-2xl text-xs p-1 items-center">
  //                     <span>
  //                       <LightbulbOutlineIcon sx={{ fontSize: 16 }} />
  //                     </span>
  //                     <span className=" font-semibold p-1 relative">
  //                       {coupon.rewardsPoint} Points
  //                     </span>
  //                   </div>
  //                   <div className="flex justify-around items-center">
  //                     {coupon.isClaimed ? (
  //                       <PreviewIcon
  //                         onClick={()=>router.push(`/admin/view-claimed/${coupon._id}`)}
  //                         sx={{ fontSize: 25 }}
  //                         className="mr-2 text-blue-400 cursor-pointer"
  //                       />
  //                     ) : (
  //                       <>
  //                         <EditIcon
  //                           onClick={() => {
  //                             setEditableData({
  //                               _id: coupon._id,
  //                               couponCode: coupon.couponCode,
  //                               rewardsPoint: coupon.rewardsPoint,
  //                             });
  //                             setEditPopUp(true);
  //                             setError("");
  //                           }}
  //                           sx={{ fontSize: 25 }}
  //                           className="mr-2 text-orange-400 cursor-pointer"
  //                         />
  //                         <DeleteForeverIcon
  //                           onClick={() => {
  //                             setDeletableData({
  //                               _id: coupon._id,
  //                             });
  //                             setDeletePopUp(true);
  //                             setError("");
  //                           }}
  //                           sx={{ fontSize: 25 }}
  //                           className="mr-2 text-red-500 cursor-pointer"
  //                         />
  //                         <PreviewIcon
  //                           sx={{ fontSize: 25 }}
  //                           onClick={()=>router.push(`/admin/view-coupon/${coupon._id}`)}
  //                           className="mr-2 text-blue-400 cursor-pointer"
  //                         />
  //                       </>
  //                     )}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))
  //         ) : ( 
  //          <CouponNotFound/>
  //         )}
  //       </div>
  //     )}
  //  </>
  )
}

export default dashboard