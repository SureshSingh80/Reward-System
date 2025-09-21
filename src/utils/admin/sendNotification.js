import axios from "axios";

 export async function sendNotification(data,customerId) {
  try {
    
    const res = await axios.post("/api/admin/send-notification", {...data,customerId});
    return { success: true, data: res.data.message }
  } catch (error) {
    console.log("Error from sendNotification", error);
    return { success: false, error: error.response.data.message }
  }
}