import axios from "axios";

export function generateRandomCode(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

export async function generateCoupon(data){
     try {
          const res = await axios.post("/api/admin/generate-coupon", data);
          return {success:true, data:res.data.message};

     } catch (error) {
          console.log("Error from generateCoupon", error);
          return {success:false, error:error.response.data.message};
     }
}

