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

const ShowCoupon = () => {
  const [coupons, SetCoupons] = useState(); // all avlabile coupons
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

  const router = useRouter();

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin/fetch-coupons");
        //   console.log(res.data);
        SetCoupons(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error from fetch coupons", error);
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`flex flex-col  items-center  min-h-screen bg-gray-200 px-4 text-black ${
            editPopUp || deletePopUp ? "blur-sm" : ""
          }`}
        >
          <ToastContainer />
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
                      {coupon.isClaimed ? (
                        <PreviewIcon
                          onClick={()=>router.push(`/admin/edit-coupon/${coupon._id}`)}
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
      )}

      <EditPopUp
        editPopUp={editPopUp}
        setEditPopUp={setEditPopUp}
        editableData={editableData}
        setEditableData={setEditableData}
        error={error}
        setError={setError}
      />

      <DeletePopUp
        deletePopUp={deletePopUp}
        deletableData={deletableData}
        setDeletePopUp={setDeletePopUp}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default ShowCoupon;
