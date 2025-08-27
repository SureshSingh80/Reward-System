"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LightbulbOutlineIcon from "@mui/icons-material/LightbulbOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PreviewIcon from "@mui/icons-material/Preview";

import { ToastContainer, toast } from "react-toastify";
import EditPopUp from "@/component/EditPopUp";
import DeletePopUp from "@/component/DeletePopUp";
import Loader from "@/component/Loader";
import { useRouter } from "next/navigation";
import AdminToolBar from "@/component/AdminToolBar";
import { Ban } from "lucide-react";
import CouponNotFound from "@/component/CouponNotFound";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const ShowCoupon = () => {
  const [coupons, setCoupons] = useState(); // all avlabile coupons
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editPopUp, setEditPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editableData, setEditableData] = useState({
    _id: "",
    couponCode: "",
    rewardsPoint: "",
  });

  const [deletableData, setDeletableData] = useState({
    _id: "",
  });

  const [copiedId,setCopiedId] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin/fetch-coupons");
          console.log(res.data);
        setCoupons(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error from fetch coupons", error);
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const handleCopy = (value,id) => {
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

  // verify token for admin
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await axios.get("/api/admin/verify-token");
        console.log("response from verify Token=", res.data);
        setIsVerified(true);
      } catch (error) {
        console.log(error.response.data);
        setIsVerified(false);
        router.push("/admin/login");
      }
    };
    checkAdminAuth();
  }, []);

  return (
    <>
      {loading || !isVerified ? (
        <Loader />
      ) : (
        <div
          className={`flex flex-col  items-center  min-h-screen bg-gray-200 px-4 text-black ${
            editPopUp || deletePopUp ? "blur-sm" : ""
          }`}
        >
          <ToastContainer />
          
          {/* Toolbar Container for searching sorting and filter */}
         <AdminToolBar setCoupons={setCoupons}/>
         
          {coupons && coupons.length > 0 ? (
            coupons.map((coupon) => (
              <div key={coupon._id} className="w-full">

                
                {/* coupon card */}
                <div  className="bg-gray-100 w-full  p-4 shadow-lg flex flex-col justify-center mt-4 transition-all duration-200 hover:shadow-md hover:scale-101 cursor-pointer">
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

                      <span className="ml-2 relative" style={{bottom: "1px"}}>
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
                      {coupon.isClaimed ? (
                        <PreviewIcon
                          onClick={()=>router.push(`/admin/view-claimed/${coupon._id}`)}
                          sx={{ fontSize: 25 }}
                          className="mr-2 text-blue-400 cursor-pointer"
                        />
                      ) : (
                        <>
                          <EditIcon
                            onClick={() => {
                              setEditableData({
                                _id: coupon._id,
                                couponCode: coupon.couponCode,
                                rewardsPoint: coupon.rewardsPoint,
                              });
                              setEditPopUp(true);
                              setError("");
                            }}
                            sx={{ fontSize: 25 }}
                            className="mr-2 text-orange-400 cursor-pointer"
                          />
                          <DeleteForeverIcon
                            onClick={() => {
                              setDeletableData({
                                _id: coupon._id,
                              });
                              setDeletePopUp(true);
                              setError("");
                            }}
                            sx={{ fontSize: 25 }}
                            className="mr-2 text-red-500 cursor-pointer"
                          />
                          <PreviewIcon
                            sx={{ fontSize: 25 }}
                            onClick={()=>router.push(`/admin/view-coupon/${coupon._id}`)}
                            className="mr-2 text-blue-400 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : ( 
           <CouponNotFound/>
          )}
        </div>
      )}

      <EditPopUp
        editPopUp={editPopUp}
        setEditPopUp={setEditPopUp}
        editableData={editableData}
        setEditableData={setEditableData}
        error={error}
        setError={setError}
        setCoupons={setCoupons}
      />

      <DeletePopUp
        deletePopUp={deletePopUp}
        deletableData={deletableData}
        setDeletePopUp={setDeletePopUp}
        error={error}
        setError={setError}
        setCoupons={setCoupons}
      />
    </>
  );
};

export default ShowCoupon;
