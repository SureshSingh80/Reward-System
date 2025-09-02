"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { logout } from "@/utils/admin/logout";
import {
  generateCoupon,
  generateRandomCode,
} from "@/utils/admin/generateCoupon";

const page = () => {
  const [couponCode, setCouponCode] = useState("");
  const [rewardsPoint, setRewardsPoint] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleGenerateCode = () => {
    setCouponCode(generateRandomCode());
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result?.success) {
      toast.success(result.data);
      router.push("/admin/login");
    } else {
      toast.error(result.error);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    const data = {
      couponCode: couponCode,
      rewardsPoint: rewardsPoint,
    };

    if (data.couponCode && data.rewardsPoint) {
      const result = await generateCoupon(data);
      console.log("result= ", result);
      if (result?.success) {
        toast.success(result.data);
        setLoading(false);
      } else {
        toast.error(result.error);
        setLoading(false);
      }
    } else {
      toast.error("please fill all the fields");
      setLoading(false);
    }
    setCouponCode("");
    setRewardsPoint("");
  };

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col justify-center items-center  min-h-screen bg-gray-50 px-4 text-black  ">
        {/* logout button */}
        <div className="fixed top-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-white 
            text-red-500 
            border 
            border-red-500 
            outline-none 
            px-4 
            py-2 
            rounded 
            transition 
            duration-200 
            hover:bg-red-500 
            hover:text-white
            flex
            items-center
            gap-2
            shadow-md"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* creating a form */}
        <div className="max-w-lg  bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Generate Coupon
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Generate a unique and secure coupon for your customers.
          </p>

          {/* coupon code */}
          <div className="w-full">
            <button
              onClick={handleGenerateCode}
              className="text-xs text-blue-500 cursor-pointer float-end  relative right-5 top-6  "
            >
              Auto fill
            </button>
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border border-gray-300 rounded-md px-3 w-full py-2 mb-4"
            />
          </div>

          {/* rewards point */}
          <div className="w-full">
            <input
              type="number"
              placeholder="Points"
              value={rewardsPoint}
              onChange={(e) => setRewardsPoint(e.target.value)}
              className="border border-gray-300 rounded-md px-3 w-full py-2 mb-4"
            />
          </div>
          {/* generate button */}
          <button
            onClick={handleGenerate}
            className="bg-white 
          w-full
          text-blue-500 
          border 
          border-blue-500 
          outline-none 
          px-4 
          py-2 
          rounded 
          transition 
          duration-200 
          hover:bg-blue-500 
         hover:text-white
           cursor-pointer"
          >
            {loading ? (
              <ClipLoader color="currentColor" size={20} />
            ) : (
              "Generate"
            )}
          </button>
        </div>
        {/* show all coupons button */}
        <div className="max-w-lg   p-8 flex flex-col items-center">
          <button
            onClick={() => router.push("/admin/show-coupons")}
            className="bg-white 
          w-full
          text-green-500 
          border 
          border-green-500 
          outline-none 
          px-4 
          py-2 
          rounded 
          transition 
          duration-200 
          hover:bg-green-500 
        hover:text-white  cursor-pointer"
          >
            Show Generated Coupons
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
