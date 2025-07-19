"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signUp } from "@/lib/auth";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { auth } from "@/lib/firebaseConfig";
import { getIdToken } from "firebase/auth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    // get params data from URL
    const queryString = window.location.search;
    // create a searchParams object
    const params = new URLSearchParams(queryString);

    const couponCode = params.get("coupon_code");
    console.log("couponCode=", couponCode);
    setCouponCode(couponCode);
  });

  // Watch the password field
  const password = watch("password");

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    // creating object
    const customer = {
      c_id: "",
      name: username,
      email: email,
    };
    console.log(customer);

    setLoading(true);

    // firebase signUp
    // signUp(email,password);

    signUp(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        
        
        customer.c_id = user.uid;

        // store token in cookie
        // check user status
        if (auth.currentUser) {
          const token = await getIdToken(auth.currentUser);

          // Set token in cookie
          document.cookie = `token=${token}; path=/; secure; samesite=lax`;
        }

        //  api to store data in backend
        try {
          const res = await axios.post("/api/signup", customer);
          console.log("backend-res=", res.data);
          setLoading(false);
          toast.success("Sign Up Successful");
          router.push("/?coupon_code=" + couponCode);
        } catch (error) {
          console.log("error in backend=", error);
          setLoading(false);
          toast.error("Error in Sign Up in backend");
          router.push("/signup");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Email is already registered");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode=", errorCode);
        console.log("errorMessage=", errorMessage);
      });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4 "
      style={{
        backgroundImage: 'url("/login.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-8 rounded shadow"
      >
        <h2
          className="text-2xl font-bold text-center text-gray-900"
          style={{
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          Sign Up
        </h2>

        {/* username */}
        <div>
          <label
            htmlFor="username"
            className="block mb-1 font-semibold text-gray-900"
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full border border-gray-400 px-2 py-1 rounded text-gray-900 font-medium"
            placeholder="Enter your username"
            {...register("username", { required: "Username is required" })}
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          />
          {/* Error message */}
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
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

        {/* confirm password */}
        <div style={{ position: "relative" }}>
          <label
            htmlFor="phoneNo"
            className="block mb-1 font-semibold text-gray-900"
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPasswordConfirm ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full border border-gray-400 px-2 py-1 rounded text-gray-900 font-medium"
            placeholder="Confirm Password"
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
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
            {showPasswordConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
          {/* Error message */}
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <p className="text-black text-center mt-2 text-sm">
          Already have account ?{" "}
          <Link href="/login">
            <span className="text-blue-600 text-sm">Login</span>
          </Link>
        </p>
        <button
          style={{ cursor: "pointer" }}
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-full font-semibold"
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
