import axios from "axios";

export async function fetchCoupons(){
     try {
           const res = await axios.get("/api/admin/fetch-coupons");
          return {success:true, data:res.data.coupons};
     } catch (error) {
         console.log("Error in fetching coupons");
         return {success:false, error:error.response.data.message};
     }
}

export async function CopyToClipBoard(value,id,setCopiedId){
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