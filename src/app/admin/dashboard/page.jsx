"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";

const page = () => {
  const [couponCode, setCouponCode] = useState("");
  const [rewardsPoint, setRewardsPoint] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerfied] = useState(false);
  const router = useRouter();

  function generateRandomCode(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const handleGenerateCode = () => {
    setCouponCode(generateRandomCode());
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/admin/admin-logout");
      console.log("response from logout= ", response.data);
      toast.success("Logout successful");
      router.push("/admin/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };
  const handleGenerate = async () => {
    setLoading(true);
    const data = {
      couponCode: couponCode,
      rewardsPoint: rewardsPoint,
    };

    if (data.couponCode && data.rewardsPoint) {
      try {
        const res = await axios.post("/api/admin/generate-coupon", data);
        setLoading(false);
        toast.success("Coupon Generated Successfully");
        console.log("response from generateCoupon= ", res.data);
      } catch (error) {
        setLoading(false);
        toast.error("Error in generating coupon");
        console.log(error);
      }
    } else {
      toast.error("please fill all the fields");
      setLoading(false);
    }
    setCouponCode("");
    setRewardsPoint("");
  };

  const handleShowGeneratedCoupon = () => {
    window.location.href = "/admin/show-coupons";
  };

  // verify token for admin
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await axios.get("/api/admin/verify-token");
        console.log("response from verify Token=", res.data);
        setIsVerfied(true);
      } catch (error) {
        console.log(error.response.data);
        setIsVerfied(false);
        router.push("/admin/login");
      }
    };
    checkAdminAuth();
  }, []);
  return (
    <>
      <ToastContainer />
      {!isVerified ? (
        <div className="flex flex-col justify-center items-center  min-h-screen bg-gray-100  text-black">
          <div className="text-blue-500 font-semibold">
            <div className="w-20 h-20 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-4">please wait...</p>
        </div>
      ) : (
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
              onClick={handleShowGeneratedCoupon}
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
      )}
    </>
  );
};

export default page;
