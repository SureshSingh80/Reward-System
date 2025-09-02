import axios from "axios";

export async function login(data){
    try {
        const res = await axios.post('/api/admin/admin-login',data);
        return {success:true, data:res.data.message};
    } catch (error) {
        console.log("Error from login", error);
        return {success:false, error:error.response.data.message};
    }
}