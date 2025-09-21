"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { toast, ToastContainer } from "react-toastify";
import { useNotification } from "@/app/context/NotificationContext";

const Notification = ({ notificationPopUp, setNotificationPopUp,customerId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {pushNotification} = useNotification();

  const handleNotification = async (data) => {

    
    const result = await pushNotification(data);
    console.log("result from sendNotification= ", result);
    if(result?.success){
      reset();
      toast.success(result.data,{
        onClose: () => {
          setNotificationPopUp(false);
          reset();
        }
      });
    }
    else{
      toast.error(result.error);
    }
         
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 text-black
      ${
        notificationPopUp
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <ToastContainer />
      <div
        className={`max-w-lg  bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative `}
      >
        <CloseIcon
          onClick={() => {
            setNotificationPopUp(false);
            toast.dismiss();
            reset();
          }}
          sx={{ fontSize: 25 }}
          className="mr-2 text-gray-700 cursor-pointer absolute top-4 right-4"
        />
        <h1 className="text-2xl font-bold mb-2 text-gray-800 mx-16">
          Send Notification
        </h1>

        <form
          onSubmit={handleSubmit(handleNotification)}
          className="space-y-4 w-full"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              {...register("title", { required: "Title is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {/* error for title */}
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              {...register("message", { required: "Message is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            ></textarea>
            {/* error for message */}
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          {/* Type */}
          <div>
            <label htmlFor="type" className="block font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              name="type"
              {...register("type", { required: "Type is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option className="text-gray-500" value="info">Info</option>
              <option className="text-gray-500"  value="success">Success</option>
              <option className="text-gray-500" value="warning">Warning</option>
              <option className="text-gray-500" value="error">Error</option>
            </select>
            {/* error for type */}
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>
          {/* Send Button */}
          <div className="flex ">
            <button
              type="submit"
              className="border border-indigo-500 text-indigo-500 py-2 px-4 rounded-md hover:bg-indigo-500 hover:text-white transition mr-2"
            >
              <span className="mr-2">
                <SendIcon />
              </span>
              <span>Send</span>
            </button>

            <button
              type="button"
              onClick={() => {
                reset();
              }}
              className="border border-red-500 text-red-500 py-2 px-4 rounded-md hover:bg-red-500 hover:text-white transition"
            >
              Clear form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notification;
