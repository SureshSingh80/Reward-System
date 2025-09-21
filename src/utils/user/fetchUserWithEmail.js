import axios from "axios";

export async function fetchUserWithEmail(email){
    try {
        const res = await axios.get('/api/fetch-user-with-email',{params:{email}});
        console.log("user credential= ",res.data.user);
        return {success:true, user:res.data.user};
    } catch (error) {
        console.log("Error in fetching user with email ",error);
        return {success:false, error:error.response.data.message};
    }
}

export async function redeemCoupon(couponCode,email,id){

    try {
        const res = await axios.post('/api/redeem-coupon',{couponCode:couponCode,email:email,_id:id});
        return {success:true, message:res.data.message};
    } catch (error) {
        console.log("Error in redeeming coupon ",error);
        return {success:false, error:error.response.data.message};
    }

}