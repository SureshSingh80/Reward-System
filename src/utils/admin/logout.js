import axios from "axios";

export async function logout(){
     try {
         const res = await axios.get("/api/admin/admin-logout");
         return {success:true, data:res.data.message};

     } catch (error) {
         console.log("Error from logout", error);
         return {success:false, error:error.response.data.message};
     }
}