// pages/scan.js or app/scan/page.js
'use client'
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext"; // adjust path as needed
import Link from "next/link";

export default function ScanPage() {
  const { user, loading } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  const [scanning, setScanning] = useState(false);

  // Placeholder: Replace with actual QR scanner integration
  const handleFakeScan = () => {
    setCouponCode("DEMO-COUPON-1234");
    setMessage("QR code scanned! Coupon code auto-filled.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!couponCode) {
      setMessage("Please enter or scan a coupon code.");
      return;
    }
    // TODO: Add your backend validation logic here
    setMessage(`Coupon code "${couponCode}" submitted! (Implement validation logic)`);
  };

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Scan Your Coupon</h1>
        <p className="text-gray-600 mb-6 text-center">
          Use your camera to scan the QR code on your cement coupon card, or enter the code manually below.
        </p>

        {/* Placeholder for QR scanner */}
        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded mb-4">
          <span className="text-gray-400">[ QR Scanner Here ]</span>
        </div>
        <button
          onClick={handleFakeScan}
          className="mb-6 bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 text-sm"
        >
          Demo: Simulate QR Scan
        </button>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-blue-500"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Redeem Coupon
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-blue-600 font-medium">{message}</div>
        )}
      </div>
    </div>
  );
}
