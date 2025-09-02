
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from '@/lib/firebaseConfig';
import { getIdToken } from 'firebase/auth';

import { signIn } from '@/lib/auth';

export async function login(data,setLoading,router){
    const {email,password}=data;
        // creating object
        const customer={
            email:email,
            password:password
        }
        console.log(customer);

        setLoading(true);

        // firebase signin
        signIn(email,password).then(async(userCredential,couponCode)=>{
            const user=userCredential.user;
            console.log("user=",user);
             setLoading(false);
             toast.success('Login Successful');
             
             // check user status
             if(auth.currentUser){
               const token = await getIdToken(auth.currentUser);

               // Set token in cookie (max age 7 days)
               await axios.post('/api/set-token',{token});
                
             }

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