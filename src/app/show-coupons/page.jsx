"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { logOut } from "@/lib/auth";
import { auth } from "@/lib/firebaseConfig";
import axios from "axios";
import Loader from "@/component/Loader";
import { ToastContainer, toast } from "react-toastify";
import CustomerToolBar from "@/component/CustomerToolBar";
import { useAuth } from "@/lib/AuthContext";
import LightbulbOutlineIcon from "@mui/icons-material/LightbulbOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CouponNotFound from "@/component/CouponNotFound";
import { useRouter } from "next/navigation";
import { CheckCircle, ShieldCheck, Clock } from "lucide-react";
import { Copy, fetchClaimedCoupon, verifyCoupon } from "@/utils/user/fetchClaimedCoupon";


const dashboard = () => {
  const router = useRouter();

  // finding credentials from firebase
  const { user, loading } = useAuth();

  const [loader, setLoader] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const [verifyingCouponId, setVerifyingCouponId] = useState(null);
  const [claimedCoupons, setClaimedCoupons] = useState([]);


  // useEffect for fetching claimed coupon
  useEffect(() => {
    const getClaimedCoupon = async () => {
      const result = await fetchClaimedCoupon(user.email);
      console.log("result for claimed coupon= ",result);

      if(result?.success){
          setClaimedCoupons(result.coupons);
          setLoader(false);
      }else{
         toast.error(result.error);
         setLoader(false);
      }
    };

    if (user && !loading && user.email) {
      getClaimedCoupon();
    }
  }, [user]);

 

  const handleVerify = async (couponCode,id) => {
    if (!couponCode || !user || !user.email) {
      toast.error("unauthorized");
      return;
    }
      setVerifyingCouponId(id);
      const result = await verifyCoupon(couponCode,user.email);
      console.log("verifyCoupon result= ",result);

      if(result?.success){
          toast.success(result.message);
          // convert isVerfied to true for this couponCode
          const updatedClaimedCoupons = claimedCoupons.map((coupon) => {
            if (coupon.couponCode === couponCode) {
              return { ...coupon, isVerified: true, verifiedAt: new Date() };
            }
            return coupon;
          });
          setClaimedCoupons(updatedClaimedCoupons);
      }else{
          toast.error(result.error);
      }
      setVerifyingCouponId(null);

  };

  return (
    <>
      {loader || loading ? (
        <Loader />
      ) : (
        <div
          className={`flex flex-col  items-center  min-h-screen bg-gray-200 px-4 text-black     }`}
        >
         

          <ToastContainer />

          {/* Toolbar Container for searching sorting and filter */}
          <CustomerToolBar
            claimedCoupons={claimedCoupons}
            setClaimedCoupons={setClaimedCoupons}
            email={user?.email}
          />

          {claimedCoupons && claimedCoupons.length > 0 ? (
            claimedCoupons.map((coupon) => (
              <div key={coupon._id} className="w-full">
                {/* coupon card */}
                <div className="bg-gray-100 w-full  p-4 shadow-lg flex flex-col justify-center mt-4 transition-all duration-200 hover:shadow-md hover:scale-101 cursor-pointer">
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

                      <span className="ml-2 relative" style={{ bottom: "1px" }}>
                        {copiedId === coupon._id ? (
                          <DoneAllIcon sx={{ fontSize: 15 }} />
                        ) : (
                          <ContentCopyIcon
                            sx={{ fontSize: 13 }}
                            className="cursor-pointer"
                            onClick={() =>Copy(coupon.couponCode,coupon._id,setCopiedId)}
                          />
                        )}
                      </span>
                    </div>

                    <div className="flex justify-center mt-2">
                      {coupon.isVerified ? (
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-2xl 
                            bg-green-500 text-white font-semibold shadow-md 
                            cursor-not-allowed opacity-90 transition-all"
                            disabled
                          >
                          <ShieldCheck className="w-5 h-5" />
                          Verified
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerify(coupon.couponCode, coupon._id)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl 
                          bg-orange-500 text-white font-semibold shadow-md 
                          hover:bg-orange-600 hover:shadow-lg active:scale-95 
                          transition-all duration-200 cursor-pointer text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          { verifyingCouponId === coupon._id ? "Verifying..." : "Verify" }
                        </button>
                      )}
                    </div>
                  </div>

                  {/* second row */}
                  <div className="flex flex-row justify-between mt-4">
                    <div className="flex bg-green-100 text-green-500 rounded-2xl text-xs p-1 items-center">
                      <span>
                        <LightbulbOutlineIcon sx={{ fontSize: 16 }} />
                      </span>
                      <span className=" font-semibold p-1 relative">
                        {coupon.rewardsPoint} Points
                      </span>
                    </div>
                    <div className="flex justify-around items-center">
                      {
                        coupon.isVerified ? (
                          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                            <CheckCircle size={16} />
                            <span>
                              Verified on{"- "}
                              <i className="text-gray-700">
                                {new Date(coupon?.verifiedAt).toLocaleDateString("en-GB")}
                              </i>
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-yellow-600 text-sm font-medium">
                            <Clock size={16} />
                            <span>
                              Claimed on{"- "}
                              <i className="text-gray-700">
                                {new Date(coupon?.redeemedAt).toLocaleDateString("en-GB")}
                              </i>
                            </span>
                          </div>
                        )
                      }
                     
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <CouponNotFound />
          )}
        </div>
      )}
    </>
  );
};

export default dashboard;
