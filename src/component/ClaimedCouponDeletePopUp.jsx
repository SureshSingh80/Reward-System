import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { set } from 'mongoose';
import { useRouter } from 'next/navigation';


const ClaimedCouponDeletePopUp = ({claimedCouponDeletePopUp,setClaimedCouponDeletePopUp,error,setError,couponCode,typedCouponCode,setTypedCouponCode}) => {

    const [loading,setLoading] = useState(false);
    const router = useRouter();

    // condition: does typed text match couponCode?
  const isMatch = typedCouponCode === couponCode;

    const handleDelete = async()=>{
           setLoading(true);
           setError('');
           if(!typedCouponCode || typedCouponCode !== couponCode){
               setError('Coupon code does not match');
               setLoading(false);
               return;
           }
           try {
              const res = await axios.delete('/api/admin/delete-claimed-coupon',{data:{couponCode:typedCouponCode}});
              console.log(res.data.message);
              setClaimedCouponDeletePopUp(false);
              setLoading(false);
              router.replace('/admin/claimed-coupons');
           } catch (error) {
              console.log("Error in deleting claimed coupon",error);
              setLoading(false);
              setError(error);
           }
    }
  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 text-black  ${
          claimedCouponDeletePopUp
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}>
        <div className={`max-w-lg  bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative `}>
            <CloseIcon
            onClick={() => setClaimedCouponDeletePopUp(false)}
            sx={{ fontSize: 25 }}
            className="mr-2 text-red-400 cursor-pointer absolute top-4 right-4"
          />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Delete Coupon</h1>
          <p className="text-gray-600 mb-2 text-center">
           Are you sure to Delete this coupon ?
          </p>
          <input type='text' value={typedCouponCode} onChange={(e)=>setTypedCouponCode(e.target.value)} placeholder='type Coupon Code' className='border border-gray-300 rounded-md p-2 mb-2 w-full'/>
          {
            error && (
              <p className='text-red-500 text-sm mb-2'>{error}</p>
            )
          }

          {/* choice for delete */}
          <div>
            <button onClick={handleDelete}   disabled={!isMatch}
            className={`py-2 px-4 rounded-md mr-2 cursor-pointer ${
              isMatch
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}>{loading ? "Deleting..." : "Delete"}</button>
            {/* <button onClick={()=>setClaimedCouponDeletePopUp(false)} className="bg-gray-500 text-white py-2 px-4 rounded-md cursor-pointer">Cancel</button> */}
          </div>

        </div>
    </div>
  )
}

export default ClaimedCouponDeletePopUp