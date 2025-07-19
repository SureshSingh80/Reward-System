// pages/index.js or app/page.js
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext' // or your auth hook/provider
import { useEffect, useState } from 'react';

export default function Home() {
  const { user, loading } = useAuth(); // getting auth state from context
  const [couponCode,setCouponCode] = useState('');

  useEffect(()=>{
     // get params data from URL
      const queryString = window.location.search;
      // create a searchParams object
      const params = new URLSearchParams(queryString);

      const couponCode = params.get('coupon_code');
      console.log("couponCode=",couponCode);
      setCouponCode(couponCode);

  })

  const handleSubmit = ()=>{

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
        <Image
          src="/get-rewarded.jpg" // Place a happy smile image in your /public folder
          width={120}
          height={120}
          alt="Happy customer"
          className="mb-6"
        />
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Welcome to  Rewards!</h1>
        { loading ? (
          <div className="text-blue-500 font-semibold"></div>
        ) : user ? (
          <div className="text-green-500 font-semibold">Click On Reedom Coupon To Get Your Rewards</div>
        ) : (
          <div className="text-red-500 font-semibold">You are not logged in</div>
        )}
       

        {loading ? (
          <div className="text-blue-500 font-semibold">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : user ? (
           <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-gray-800 focus:outline-blue-500"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer" 
          >
            Redeem Coupon
          </button>
        </form>
        ) : (
          <div className="w-full flex flex-col items-center">
            <p className="text-red-500 mb-3 font-semibold">
              Please log in to get Rewards
            </p>
            <div className="flex gap-3">
              <Link href={`/login?coupon_code=${couponCode}`}>
                <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href={`/signup?coupon_code=${couponCode}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

