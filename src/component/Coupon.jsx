"use client";
import CloseIcon from "@mui/icons-material/Close";
import React, { useRef, useState } from "react";


const Coupon = ({ printPopUp, setPrintPopUp, qrImage, coupon }) => {
  const [isPrinting, setIsPrinting] = useState(false);


  const handlePrint=()=>{
    console.log("clicked");
    setIsPrinting(true);
     setTimeout(() => {
       window.print();
     },100);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 text-black  ${
        printPopUp
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* creating container for div */}
      <div
        className={`bg-white rounded-xl shadow-lg p-8 m-4 flex flex-col items-center relative w-full 
          ${isPrinting ? "h-full" : "max-w-lg"}`}
      >
        <CloseIcon
          onClick={() =>{ setPrintPopUp(false); setIsPrinting(false);}}
          sx={{
            fontSize: 25,
            "@media print": {
              display: "none",
            },
          }}
          className="mr-2 text-red-400 cursor-pointer absolute top-4 right-4 print:hidden"
        />
        {qrImage && (
          <div  className="w-full flex flex-col items-center  ">
            {/* inner div */}
            <div className="flex flex-col items-center mb-4">
              <img src={qrImage} alt="QR Code" className="w-32 h-32" />
              <span className="text-sm text-orange-500  font-medium">
                📱Scan to redeem
              </span>
            </div>

            <div className="bg-green-100 text-green-900 rounded-md p-4 w-full text-center space-y-2">
              <div>
                <p className="text-sm font-medium">Created At -</p>
                <p className="text-lg font-semibold">
                  {new Date(coupon?.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Code -</p>
                <p className="text-lg font-bold tracking-wide text-blue-800">
                  {coupon?.couponCode}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Reward Points -</p>
                <p className="text-lg font-bold text-green-700">
                  {coupon?.rewardsPoint}
                </p>
              </div>
            </div>

            {/* how to use */}
            <div className="self-start mt-2">
              <p>💡How to use</p>
              <div className="ml-12">
                <ul className="list-decimal">
                  <li>Scan QR Code and navigate to our official website.</li>
                  <li>Create an Account, if not you have.</li>
                  <li>Fill Code and redeem Coupon</li>
                  <li>
                    If any problem , please Dial this number - (8573838252)
                  </li>
                </ul>
              </div>
            </div>

            {/* terms and conditions */}
            <div className="self-start">
              <p className="mt-4 text-center font-bold text-xl float-left">
                Terms and Conditions
              </p>
              <p className="text-sm ml-4">&bull; Valid for one-time use only</p>
            </div>

            <div className="text-center mt-3 print:hidden">
              <button
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupon;
