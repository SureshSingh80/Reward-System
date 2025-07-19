'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {toast,ToastContainer} from 'react-toastify'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from 'next/link'
import { ClipLoader } from "react-spinners";
import axios from 'axios'


const AdminCreation = () => {

     const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

       const [loading, setLoading] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const router = useRouter();

        const onSubmit = async (data) => {
            setLoading(true);
        const { name, email, password } = data;
        console.log(data);
         try {
             const res = await axios.post('/api/admin/create-admin',data);
             setLoading(false);
             toast.success("Admin Created Successfully");
             console.log("response from createAdmin= ",res.data);
             router.push('/admin/login');

         } catch (error) {
             setLoading(false);
             toast.error("Error in creating admin");
             console.log(error);
         }
        
        };
  return (
   <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4 "
      style={{
        backgroundImage: 'url("/admin-bg-image.avif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-8 rounded shadow"
      >
         <img src="/admin-icon.png" width={80} alt="Logo" className="my-0 mx-auto" />
            {/* name */}
        <div>
          <label
            htmlFor="username"
            className="block mb-1 font-semibold text-gray-900"
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border border-gray-400 px-2 py-1 rounded text-gray-900 font-medium"
            placeholder="Enter Name"
            {...register("name", { required: "Name is required" })}
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          />
          {/* Error message */}
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-semibold text-gray-900"
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" },
            })}
            className="w-full border border-gray-400 px-2 py-1 rounded text-gray-900 font-medium"
            placeholder="name@example.com"
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          />
          {/* Error message */}
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* password */}
        <div style={{ position: "relative" }}>
          <label
            htmlFor="password"
            className="block mb-1 font-semibold text-gray-900"
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            Password
          </label>
          <input
            id="password"
            name="passwrod"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // At least 8 chars, one letter & one number
                message:
                  "Password must be at least 8 characters, atleast one uppercase letter, one lowercase letter, one number and one special character",
              },
            })}
            className="w-full border border-gray-400 px-2 py-1 rounded text-gray-900 font-medium"
            placeholder="Password"
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "5px",
              top: "45px",
              color: "#333333",
              border: "none",
              cursor: "pointer",
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            tabIndex={-1}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
          {/* Error message */}
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          style={{ cursor: "pointer" }}
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-full font-semibold"
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Create Admin"}
        </button>
      </form>
    </div>
  )
}

export default AdminCreation