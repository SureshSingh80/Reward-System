
import { auth } from "@/lib/firebaseConfig";
import { getIdToken } from "firebase/auth";
import axios from "axios";
import { signUp } from "@/lib/auth";
export async function signingUp(data,setLoading,toast,router,couponCode){

    const { username, email, password } = data;
     // creating object
    const customer = {
      c_id: "",
      name: username,
      email: email,
    };
    console.log(customer);
    
     signUp(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        
        
        customer.c_id = user.uid;

        // store token in cookie
        // check user status
        if (auth.currentUser) {
          const token = await getIdToken(auth.currentUser);

          // Set token in cookie (max age 7 days)
          await axios.post("/api/set-token", { token });
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
}