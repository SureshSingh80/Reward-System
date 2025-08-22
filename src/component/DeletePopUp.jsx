import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const DeletePopUp = ({deletePopUp,setDeletePopUp,deletableData,error,setError}) => {

  const handleDelete = async () => {
      try {
         const res = await axios.delete(`/api/admin/delete-coupon`,{data:{id:deletableData._id}});
         console.log(res.data);
         setDeletePopUp(false);
         window.location.reload();
      } catch (error) {
         console.log(error.response.data.message);
         setError(error.response.data.message);
      }
  }
  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 text-black  ${
          deletePopUp
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}>
        <div className={`max-w-lg  bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative `}>
            <CloseIcon
            onClick={() => setDeletePopUp(false)}
            sx={{ fontSize: 25 }}
            className="mr-2 text-red-400 cursor-pointer absolute top-4 right-4"
          />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Delete</h1>
          <p className="text-gray-600 mb-2 text-center">
           Are you sure to Delete this coupon ?
          </p>
          {
            error && (
              <p className='text-red-500 text-sm mb-2'>{error}</p>
            )
          }

          {/* choice for delete */}
          <div>
            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md mr-2 cursor-pointer active:scale-95">Delete</button>
            <button onClick={()=>setDeletePopUp(false)} className="bg-gray-500 text-white py-2 px-4 rounded-md cursor-pointer active:scale-95">Cancel</button>
          </div>

        </div>
    </div>
  )
}

export default DeletePopUp