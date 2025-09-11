'use client'
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";



const Notification = ({notificationPopUp,setNotificationPopUp}) => {
  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 text-black
      ${notificationPopUp
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
      }`}>
         <div className={`max-w-lg  bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative `}>
            <CloseIcon
                onClick={() => setNotificationPopUp(false)}
                sx={{ fontSize: 25 }}
                className="mr-2 text-gray-700 cursor-pointer absolute top-4 right-4"
            />
             <h1 className="text-2xl font-bold mb-2 text-gray-800 mx-16">Send Notification</h1>
           
             <form className="space-y-4 w-full">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                {/* Message */}
                <div>
                    <label htmlFor="message" className="block font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    ></textarea>
                </div>
                {/* Type */}
                <div>
                    <label htmlFor="type" className="block font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    >
                        <option value="info">Info</option>
                        <option value="success">Success</option>
                        <option value="warning">Warning</option>
                    </select>
                </div>
                {/* Send Button */}
                <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                >
                    Send
                </button>
            </form>
         </div>
    </div>
  )
}

export default Notification