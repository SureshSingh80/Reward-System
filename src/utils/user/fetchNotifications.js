import axios from "axios";

export async function fetchNotifications(id){
    try {
        const res = await axios.get(`/api/fetch-notifications?id=${id}`);
        return {success:true, notifications:res.data.notifications};
    } catch (error) {
        return {success:false, error:error.response.data.message};
    }
}