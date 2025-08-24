"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { logOut } from "@/lib/auth";
import { auth } from "@/lib/firebaseConfig";
import axios from "axios";
import Loader from "@/component/Loader";
import { ToastContainer } from "react-toastify";
import CustomerToolBar from "@/component/CustomerToolBar";
import { useAuth } from "@/lib/AuthContext";
import LightbulbOutlineIcon from "@mui/icons-material/LightbulbOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CouponNotFound from "@/component/CouponNotFound";
import { useRouter } from "next/navigation";

const dashboard = () => {
  const router = useRouter();

  // finding credentials from firebase
  const { user, loading } = useAuth();

  const [loader, setLoader] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  //  const [loading, setLoading] = useState(true);
  const [claimedCoupons, setClaimedCoupons] = useState([]);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post("/api/verifyToken");
        console.log("useEffect running", res);
        if (res.status === 200) {
          console.log("Token is valid");
        }
      } catch (error) {
        console.log("Error in verficatoin=", error.response.data);
        await logOut(auth);
        // Clear the token cookie
        await axios.post("/api/clear-token");
        window.location.href = "/login";
      }
    };
    verifyToken();
  }, []);

  // useEffect for fetching claimed coupon
  useEffect(() => {
    const fetchClaimedCoupon = async () => {
      try {
        const res = await axios.get(
          "/api/fetch-claimed-coupon?email=" + user.email
        );
        console.log("claimed coupon response", res.data.message);
        setClaimedCoupons(res.data.message);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };

    if (user && !loading && user.email) {
      fetchClaimedCoupon();
    }
  }, [user]);

  const handleCopy = (value, id) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopiedId(id);
        })
        .catch((error) => {
          console.log("clipboard copy failed", error);
          alert("Copy failed, Try manually");
        });
    } else {
      alert("Clipboard not supported in this environment");
    }

    // reset copy state after 2 second
    setTimeout(() => {
      setCopiedId(false);
    }, 2000);
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
          <CustomerToolBar claimedCoupons={claimedCoupons} setClaimedCoupons={setClaimedCoupons} email={user?.email} />

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
                            onClick={() =>
                              handleCopy(coupon.couponCode, coupon._id)
                            }
                          />
                        )}
                      </span>
                    </div>

                    <div className="flex justify-center mt-2">
                      <button className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600">
                        Verify
                      </button>
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
                      <PreviewIcon
                        sx={{ fontSize: 25 }}
                        onClick={() =>
                          router.push(`/admin/view-coupon/${coupon._id}`)
                        }
                        className="mr-2 text-blue-400 cursor-pointer"
                      />
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
