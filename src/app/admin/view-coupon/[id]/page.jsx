"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/component/Loader";
import QRCode from "qrcode";
import Coupon from '@/component/Coupon'

const page = () => {
  const params = useParams(); // get parameter(id) from url
  const [coupon, setCoupon] = useState();
  const [qrImage, setQrImage] = useState();
  const [loading, setLoading] = useState(true);
  const [printPopUp,setPrintPopUp] = useState(false);
  //  const [qrUrl,setQrUrl] = useState()

  useEffect(() => {
    console.log(params.id);

    const FetchCoupon = async () => {
      try {
        const res = await axios.get(`/api/admin/fetch-coupon?id=${params.id}`);
        console.log("res= ", res);
        setCoupon(res.data);
        setLoading(false);
        console.log("Params ID=", params.id);
      } catch (error) {
        console.log(error);
        console.log("Params error ID=", params.id);
        setLoading(false);
      }
    };

    FetchCoupon();
  }, []);

  const generateQR = async () => {
    try {
      const qr = await QRCode.toDataURL(
        `http://localhost:3000?coupon_code=${coupon?.couponCode}`
      );
      setQrImage(qr);
    } catch (error) {
      console.log("failed to generate QR Code", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className={`flex flex-col  items-center justify-center  min-h-screen bg-gray-200 px-4 text-black print:hidden ${
            printPopUp ? "blur-sm" : ""
          }`}>
        <div className="bg-gray-100 w-full md:w-[40%]  p-8 shadow-lg flex flex-col justify-center  items-center mt-4 ">
          <h3 className="text-2xl font-bold mb-2 text-gray-800">
            Generate QR Code 
          </h3>
          <input
            type="text"
            value={`http://localhost:3000?coupon_code=${coupon?.couponCode}`}
            readOnly
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full "
          />
          <button
            onClick={generateQR}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer w-full md:w-auto"
          >
            Generate
          </button>
          {qrImage && (
            <div className="mt-4">
              <img src={qrImage} alt="QR Code" width="150" height="150" />
            </div>
          )}

          {qrImage && (
            <button
              onClick={() => setPrintPopUp(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded cursor-pointer mt-4 w-full md:w-auto"
            >
              Print Coupon Now
            </button>
          )}
        </div>

        
      </div>
      {/* coupon popUp (component) */}
        <Coupon
          printPopUp={printPopUp}
          setPrintPopUp={setPrintPopUp}
          qrImage={qrImage}
          coupon={coupon}
        />
    </div>
  );
};

export default page;
