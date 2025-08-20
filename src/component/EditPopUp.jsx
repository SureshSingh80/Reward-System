'use client'
import React, { useEffect,useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';


const EditPopUp = ({editPopUp,setEditPopUp,editableData,setEditableData,error,setError,setCoupons}) => {

    const [editLoading, setEditLoading] = useState(false);
    

 function generateRandomCode(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const handleGenerateCode = () => {
    setEditableData({
      ...editableData,
      couponCode:generateRandomCode()
    })
  };

  const handleUpdate = async() => {
      
      console.log("Handle Edit working...");
      // form validation
      if(editableData.couponCode.length === 0 || editableData.rewardsPoint.length === 0){
          setError('All fields are required');
      }
      else{
        setEditLoading(true);
           try {

              const res = await axios.post('/api/admin/update-coupon',{
                  _id:editableData._id,
                  couponCode:editableData.couponCode,
                  rewardsPoint:editableData.rewardsPoint
              });

            console.log(res.data.coupon);
            const updatedCoupon = res.data.coupon;
            setEditLoading(false);
            setEditPopUp(false);

            setCoupons(prevCoupons =>
                prevCoupons.map(coupon =>
                  coupon._id === updatedCoupon._id ? updatedCoupon : coupon
                )
              );
         
      } catch (error) {
         console.log("Error while updating coupon",error.response.data.message);
         setError(error.response?.data?.message);
         setEditLoading(false);
        }
      }
     
      
  };

  return (
    <div
        className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500  ${
          editPopUp
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* creating a form */}
        <div
          className={`max-w-lg  bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative `}
        >
          <CloseIcon
            onClick={() => setEditPopUp(false)}
            sx={{ fontSize: 25 }}
            className="mr-2 text-red-400 cursor-pointer absolute top-4 right-4"
          />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Edit Coupon</h1>
          <p className="text-gray-600 mb-6 text-center">
            Please Edit your Coupon
          </p>

          {/* coupon code */}
          <div className={`w-full`}>
            <button
              onClick={handleGenerateCode}
              className="text-xs text-blue-500 cursor-pointer float-end  relative right-5 top-6  "
            >
              Auto fill
            </button>
            <input
              type="text"
              placeholder="Coupon Code"
              value={editableData.couponCode}
              onChange={(e) =>  setEditableData({ ...editableData, couponCode: e.target.value })}
              className="border border-gray-300 rounded-md px-3 w-full py-2 mb-4 text-black"
            />
          </div>

          {/* rewards point */}
          <div className="w-full">
            <input
              type="number"
              placeholder="Points"
              value={editableData.rewardsPoint}
              onChange={(e) => setEditableData({ ...editableData, rewardsPoint: e.target.value })}
              className="border border-gray-300 rounded-md px-3 w-full py-2 mb-2 text-black"
            />
          </div>
          {/* update status failed updated */}
          {error && (
             <p className="text-red-500 text-sm mb-2">{error}</p>
          )}
          {/* Update  button */}
          <button
            type='button'
            onClick={handleUpdate}
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
            {
              editLoading ? (
                <p>Updating...</p>
              ):
              (
                <p>Update Coupon</p>
              )
            }
           
          </button>
        </div>
      </div>
  )
}

export default EditPopUp