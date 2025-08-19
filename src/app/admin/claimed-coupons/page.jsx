'use client'
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import LightbulbOutlineIcon from "@mui/icons-material/LightbulbOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PreviewIcon from "@mui/icons-material/Preview";
import Loader from '@/component/Loader';
import { useRouter } from 'next/navigation';

// verify token for admin
  // useEffect(() => {
  //   const checkAdminAuth = async () => {
  //     try {
  //       const res = await axios.get("/api/admin/verify-token");
  //       console.log("response from verify Token=", res.data);
  //       setIsVerfied(true);
  //     } catch (error) {
  //       console.log(error.response.data);
  //       setIsVerfied(false);
  //       router.push("/admin/login");
  //     }
  //   };
  //   checkAdminAuth();
  // }, []);

const page = () => {

    const [loading,setLoading] = useState(true);
    const [coupons,SetCoupons] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        const fetchClaimedCoupons = async () => {
            setLoading(true);
            try {
              const res = await axios.get("/api/admin/fetch-claimed-coupons");
                console.log("claimed coupons = ",res.data.coupons);
              SetCoupons(res.data.coupons);
              setLoading(false);
            } catch (error) {
              console.log("Error from fetch coupons", error);
              setLoading(false);
            }
        }
        fetchClaimedCoupons();
    },[])
  return (
    <>
      {
        loading ? <Loader/> : (
            <div className='flex flex-col  items-center  min-h-screen bg-gray-200 px-4 text-black'>
                {coupons && coupons.length > 0 ? (
            coupons.map((coupon) => (
              <div key={coupon._id} className="w-full">
                {/* coupon card */}
                <div  className="bg-gray-100 w-full  p-4 shadow-lg flex flex-col justify-center mt-4">
                  {/* first row */}
                  <div className="flex flex-row justify-between">
                    <div className="flex ">
                      <span
                        className="material-symbols-outlined mr-2 text-blue-900"
                        style={{ fontSize: "20px" }}
                      >
                        featured_seasonal_and_gifts
                      </span>

                      <span
                        className="font-mono font-semibold"
                        style={{ fontSize: "16px" }}
                      >
                        {coupon.couponCode}
                      </span>
                    </div>

                    {coupon.isClaimed ? (
                      <div className=" flex items-center justify-center text-red-500 bg-red-100 rounded-full text-xs font-semibold  px-2">
                        Redeemed
                      </div>
                    ) : (
                      <div className=" flex items-center justify-center text-green-500 bg-green-100 rounded-full text-xs font-semibold  px-2">
                        Available
                      </div>
                    )}
                  </div>

                  {/* second row */}
                  <div className="flex flex-row justify-between mt-4">
                    <div className="flex bg-blue-100 text-blue-500 rounded-2xl text-xs p-1 items-center">
                      <span>
                        <LightbulbOutlineIcon sx={{ fontSize: 16 }} />
                      </span>
                      <span className=" font-semibold p-1 relative">
                        {coupon.rewardsPoint} Points
                      </span>
                    </div>
                    <div className="flex justify-around items-center">
                      
                        <PreviewIcon
                          onClick={()=>router.push(`/admin/view-claimed/${coupon._id}`)}
                          sx={{ fontSize: 25 }}
                          className="mr-2 text-blue-400 cursor-pointer"
                        />
                     
                     
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : ( 
            <div className=" mb-2 flex flex-col justify-center items-center w-full h-screen ">
              <div className="shadow-lg bg-white rounded-xl p-12">
               <div className="text-xl">No Coupons Found</div>
                <div className="text-center mt-6">
                  <button onClick={() => router.back()} className="bg-gray-600 text-white py-2 px-4 rounded cursor-pointer">Back </button>
                </div>
              </div>
            </div>
          )}
            </div>
          )
      }  
    </>
  )
}

export default page