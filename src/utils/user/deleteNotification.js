import axios from "axios";

export async function deleteNotification(notificationId,customerId){
      try {
          const res = await axios.delete('/api/delete-notification',{data:{notificationId,customerId}});
          return {success:true, data:res.data.message};
      } catch (error) {
         console.log("Error in deleting notifications",error);
         return {success:false, error:error.response.data.message};
      }
}