'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from '@/lib/auth';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';






const Login = () => {

    const {register,handleSubmit,watch,formState:{errors}}=useForm();
    const  router = useRouter();
    const [loading,setLoading]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
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
    
    const onSubmit=(data)=>{
        const {email,password}=data;
        // creating object
        const customer={
            email:email,
            password:password
        }
        console.log(customer);

        setLoading(true);

        // firebase signin
        signIn(email,password).then((userCredential)=>{
            const user=userCredential.user;
            console.log("user=",user);
             setLoading(false);
            toast.success('Login Successful');
            router.push('/?coupon_code='+couponCode);
            
        }).catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
            setLoading(false);
            
            toast.error(errorMessage);
            console.log("errorCode=",errorCode);
            console.log("errorMessage=",errorMessage);
        });
    }
  return (
    <div className="w-full max-w-sm mx-auto mt-30">
         <ToastContainer/>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold text-center text-gray-900" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
              Login
            </h2>

            {/* email */}
            <div>
              <label htmlFor="email" className="block mb-1 font-semibold text-gray-900" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                {...register('email',{required:'Email is required',pattern:{value:/\S+@\S+\.\S+/,message:'Email is invalid'}})}
                className="w-full border border-gray-400 px-2 py-1 rounded text-gray-900 font-medium"
                placeholder="name@example.com"
                style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
              />
              {/* Error message */}
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            

            {/* password */}
           
            <div style={{position:'relative'}}>
              <label htmlFor="password" className="block mb-1 font-semibold text-gray-900" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
                Password
              </label>
              <input
                id="password"
                name="passwrod"
                type={showPassword ? 'text' : 'password'}
                {...register('password',{required:'Password is required',pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // At least 8 chars, one letter & one number
                  message: 'Password must be at least 8 characters, atleast one uppercase letter, one lowercase letter, one number and one special character'
                }})}
                className="w-full border border-gray-400 px-2 py-1 rounded text-gray-900 font-medium"
                placeholder="Password"
                style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
                 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{position:'absolute',right:'5px',top:'45px',color:'#333333',border:'none',cursor:'pointer'}}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                tabIndex={-1}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
              
              {/* Error message */}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

           
            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-semibold">
              {loading ? <ClipLoader size={20} color="#fff" /> : "Sign In"}
            </button>
           
          </form>
        </div>
  )
}

export default Login