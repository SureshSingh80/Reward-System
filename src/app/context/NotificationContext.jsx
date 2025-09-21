"use client";
import { useAuth } from "@/lib/AuthContext";
import { fetchUserWithEmail } from "@/utils/user/fetchUserWithEmail";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const NotificationContext = createContext();
export function NotificationProvider({ children }) {
 
     // get current user auth
     const {user,loading} = useAuth();
     const [currentUser,setCurrentUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);

   // fetch user Credential
       useEffect(()=>{
          const fetchUser = async () => {
            console.log("fetching user email (provide");
             const result = await fetchUserWithEmail(user?.email);
             console.log("result for user from notificatoin(provider)= ",result);
             if(result?.success){
               setCurrentUser(result.user);
             }else{
               toast.error(result.error);
             }
          }
          
          if(user && !loading && user?.email){
              fetchUser();
          }
       },[user]);

  // fetch all notifications
  const fetchNotifications = async () => {
    console.log("current User provider===",currentUser);
    setLoadingNotifications(true);
    try {
      const res = await axios.get(`/api/fetch-notifications?id=${currentUser?._id}`);
      console.log("notifications== ", res.data.notifications.notifications);
      setNotifications(res.data.notifications.notifications);
      setLoadingNotifications(false);
      return { success: true, notifications: res.data.notifications };
    } catch (error) {
      console.log("Error in fetching notifications(provider)", error.response.data.message);
      setLoadingNotifications(false);
      toast.error(error.response.data.message);
      return { success: false, error: error.response.data.message };
    }
  };

  
  
  useEffect(()=>{
    if(user && !loading && user?.email && currentUser?._id){
        console.log("fetching user notifications");
        fetchNotifications();
    }     
  },[user,currentUser]);

  // deleting notifications
  const deleteNotifications = async(notificationId)=>{
       try {
          const res = await axios.delete('/api/delete-notification',{data:{notificationId,customerId:currentUser?._id}});
          await fetchNotifications();
          return {success:true, data:res.data.message};
      } catch (error) {
         console.log("Error in deleting notifications or fetching notifications",error);
         toast.error(error.response.data.message);
         return {success:false, error:error.response.data.message};
      }
  };

   // send notification
  const pushNotification = async(data)=>{
    console.log("data= ",data);
     try {
        const res = await axios.post("/api/admin/send-notification", {...data,customerId:currentUser?._id});

        await fetchNotifications();       
        return { success: true, data: res.data.message }
   } catch (error) {
    console.log("Error from pushNotification or fetching notifications", error);
    
    return { success: false, error: error.response.data.message }
    }
  };

  const marksNotificationAsRead = async(notificationId)=>{
     try {
        const res = await axios.put('/api/mark-notification-as-read',{notificationId});
        await fetchNotifications();
        return {success:true, data:res.data.message};
    } catch (error) {
       console.log("Error in deleting notifications or fetching notifications",error);
       toast.error(error.response.data.message);
       return {success:false, error:error.response.data.message};
    }
  };

  
  return (
    <>
      {/* <ToastContainer/> */}
      <NotificationContext.Provider
      value={{ notifications, fetchNotifications,deleteNotifications,pushNotification,currentUser,loadingNotifications,marksNotificationAsRead }}
      >
        {children}
      </NotificationContext.Provider>
    </>
    
  );
}
export const useNotification = () => useContext(NotificationContext);