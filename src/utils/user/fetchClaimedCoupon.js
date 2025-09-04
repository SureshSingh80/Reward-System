import axios from "axios";

export async function fetchClaimedCoupon(email){
    try {
        const res = await axios.get("/api/fetch-claimed-coupon?email="+email);
        return {success:true, coupons:res.data.coupons};
    } catch (error) {
        console.log("error in fetching user claimedCoupons",error);
        return {success:false, error:error.response.data.message};
    }
}

export async function Copy(value,id,setCopiedId){
      if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
              .writeText(value)
              .then(() => {
                setCopiedId(id);
              })
              .catch((error) => {
                console.log("clipboard copy failed", error);
                alert("Copy failed, Try manually");
              });
          } else {
            alert("Clipboard not supported in this environment");
          }
      
          // reset copy state after 2 second
          setTimeout(() => {
            setCopiedId(false);
          }, 2000);
}
export async function verifyCoupon(couponCode,email){
   try {
        const res = await axios.post("/api/verify-coupon", {couponCode,email});
        return {success:true, message:res.data.message};
   } catch (error) {
       console.log("Error in verfiying coupon",error);
       return {success:false, error:error.response.data.message};
   }
}
