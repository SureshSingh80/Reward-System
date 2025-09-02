import axios from "axios";

export async function viewCoupon(id){
    try {
        const res = await axios.get(`/api/admin/fetch-coupon?id=${id}`);
        return {success:true, data:res.data.coupon};
    } catch (error) {
        return {success:false, error:error.response.data.message};
    }
}