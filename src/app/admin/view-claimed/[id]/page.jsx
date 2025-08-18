"use client";
import Loader from "@/component/Loader";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailIcon from "@mui/icons-material/Email";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClaimedCouponDeletePopUp, {
  claimedCouponDeletePopUp,
} from "@/component/ClaimedCouponDeletePopUp";
import { set } from "mongoose";

const page = () => {
  const params = useParams(); // get parameter(id) from url
  const [claimedCoupon, setClaimedCoupon] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [claimedCouponDeletePopUp, setClaimedCouponDeletePopUp] =
    useState(false);
  const [typedCouponCode, setTypedCouponCode] = useState("");

  useEffect(() => {
    console.log("id in viewclaimed", params.id);
    const FetchCoupon = async () => {
      try {
        const res = await axios.get(
          "/api/admin/fetch-claimed-coupon?id=" + params.id
        );
        console.log("claimed coupon response", res.data.message);
        setClaimedCoupon(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    FetchCoupon();
  }, []);

  const handleCopy = (value) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopied(true);
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
      setCopied(false);
    }, 2000);
  };
  return (
    <>
      <div
        className={`flex justify-center items-center min-h-screen bg-gray-100 w-full text-black ${
          claimedCouponDeletePopUp ? "blur-sm" : ""
        } "`}
      >
        {claimedCoupon ? (
          <div className="w-full sm:w-2/3 lg:w-2/3 xl:w-2/3  mx-4">
            {/* always larger width on bigger screens */}
            <div className="w-full relative">
              <div className="bg-gray-50 px-4 py-6 rounded shadow-md">
                {/* Coupon code status */}
                <div className="flex justify-between w-full relative ">
                  <div>
                    <p>
                      <span
                        className="material-symbols-outlined mr-2 text-blue-900"
                        style={{ fontSize: "20px" }}
                      >
                        featured_seasonal_and_gifts
                      </span>
                      <span className="mr-2">{claimedCoupon?.couponCode}</span>
                      <span>
                        {copied ? (
                          <DoneAllIcon sx={{ fontSize: 15 }} />
                        ) : (
                          <ContentCopyIcon
                            sx={{ fontSize: 15 }}
                            className="cursor-pointer"
                            onClick={() =>
                              handleCopy(claimedCoupon?.couponCode)
                            }
                          />
                        )}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p>
                      <span className="text-green-400 mr-1">
                        <CheckCircleOutlineIcon />
                      </span>
                      Claimed
                    </p>
                  </div>
                </div>

                {/* Rewards Information */}
                <div className="flex justify-between w-full relative mt-4 text-gray-500 font-bold">
                  <p>Rewards Information</p>
                </div>

                {/* Points information */}
                <div className="flex justify-between w-full relative mt-4">
                  <p className="text-gray-500">Points</p>
                  <p>{claimedCoupon?.rewardsPoint}</p>
                </div>

                {/* Created At */}
                <div className="flex justify-between w-full relative mt-4">
                  <p className="text-gray-500">Created At:</p>
                  <p>
                    {claimedCoupon?.createdAt
                      ? new Date(claimedCoupon?.createdAt).toLocaleString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )
                      : ""}
                  </p>
                </div>

                {/* Claimed Information */}
                <div className="flex justify-between w-full relative mt-4">
                  <p className="text-gray-500">Redemmed By</p>
                  <p>{claimedCoupon?.redeemedBy}</p>
                </div>

                {/* Customer Information */}
                <div className="flex justify-between w-full relative mt-4 text-gray-500 font-bold">
                  <p>Customer Information</p>
                </div>

                {/* Email Information */}
                <div className="flex justify-between w-full relative mt-4">
                  <p className="text-gray-500">Email</p>
                  <p>{claimedCoupon?.redeemedByEmail}</p>
                </div>

                {/* delete and contact button */}
                <div className="flex justify-between w-full relative mt-4">
                  {/* Contact Customer */}
                  <div>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${claimedCoupon?.redeemedByEmail}&su=Regarding%20Your%20Reward&body=Hello%2C%0A%0AI%20wanted%20to%20discuss%20your%20recent%20coupon%20redemption.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="bg-blue-600 text-white  px-2 py-2  cursor-pointer">
                        <EmailIcon />{" "}
                        <span className="relative" style={{ top: "2px" }}>
                          Contact Customer
                        </span>
                      </button>
                    </a>
                  </div>

                  {/* Delete button */}
                  <div>
                    <button
                      onClick={() => {
                        setClaimedCouponDeletePopUp(true),
                          setTypedCouponCode(""),
                          setError("");
                      }}
                      className="bg-red-500 text-white px-3 py-2 cursor-pointer"
                    >
                      <span className="mr-1">
                        <DeleteForeverIcon />
                      </span>
                      <span className="relative" style={{ top: "2px" }}>
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* delete popUp */}
      <ClaimedCouponDeletePopUp
        claimedCouponDeletePopUp={claimedCouponDeletePopUp}
        setClaimedCouponDeletePopUp={setClaimedCouponDeletePopUp}
        error={error}
        setError={setError}
        couponCode={claimedCoupon?.couponCode}
        typedCouponCode={typedCouponCode}
        setTypedCouponCode={setTypedCouponCode}
      />
    </>
  );
};

export default page;
