import axios from "axios";

export async function viewClaimedCoupon(id){
     try {
        const res = await axios.get("/api/admin/fetch-claimed-coupon?id=" +id);
        return {success:true, data:res.data.coupon};
     } catch (error) {
        console.log("Error from viewClaimedCoupon", error);
        return {success:false, error:error.response.data.message};
     }
}

export async function Copy(value,setCopied){
   if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopied(true);
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
      setCopied(false);
    }, 2000);
}