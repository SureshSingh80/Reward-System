import React from "react";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import WarningIcon from '@mui/icons-material/Warning';
// import InfoIcon from '@mui/icons-material/Info';
import {
  XIcon,
  CheckCircle,
  BadgeInfoIcon,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCheck,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { fetchNotifications } from "@/utils/user/fetchNotifications";
import { useNotification } from "@/app/context/NotificationContext";
import { ToastContainer } from "react-toastify";

const Notifications = ({ allNotifications,unReadNotificatons,readNotifications,setNotifications,setLoading,toast}) => {

   const {notifications,fetchNotifications,currentUser,deleteNotifications,marksNotificationAsRead} = useNotification();
 
  // delete notification
  const handleDeleteNotification = async (notificationId) => {
    const result = await deleteNotifications(notificationId);
  };

  const handleMarkedNotificationAsRead = async (notificationId) => {
      const result = await marksNotificationAsRead(notificationId);
  }
  return (
    <div className="w-full relative ">
      <ToastContainer/>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification._id} className={`w-full p-4 shadow-lg mt-2 cursor-pointer 
      ${notification.isRead ? "bg-gray-100" : "bg-gray-200"}`}>
            {/* info */}
            {/* first line */}
            <div className="flex gap-4 items-center">
              {notification.type === "info" ? (
                <Info className="w-5 h-5 text-blue-500" />
              ) : notification.type === "warning" ? (
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              ) : notification.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : notification.type === "error" ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                ""
              )}

              <h3 className="font-semibold">{notification.title}</h3>
              {/* cross */}
              <button
                onClick={() => handleDeleteNotification(notification._id)}
                className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer  "
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            {/* second line */}
            <div className="mt-2 ml-10">
              <p>{notification.message}</p>
            </div>

            {/* third line */}
          <div className="flex justify-between">
               <div className="flex ml-10 gap-4 mt-2">
              {/* date minute ago */}
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </span>
              <div>
                {notification.type === "info" ? (
                  <p className="text-blue-500 bg-blue-200 rounded py-1 px-2 text-xs">
                    {notification.type}
                  </p>
                ) : notification.type === "warning" ? (
                  <p className="text-yellow-500 bg-yellow-200 rounded py-1 px-2 text-xs ">
                    {notification.type}
                  </p>
                ) : notification.type === "success" ? (
                  <p className="text-green-500 bg-green-200 rounded py-1 px-2 text-xs">
                    {notification.type}
                  </p>
                ) : notification.type === "error" ? (
                  <p className="text-red-500 bg-red-200 rounded py-1 px-2 text-xs">
                    {notification.type}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div> 

            <div>

            {
              !notification.isRead ? 
              <button onClick={()=>{handleMarkedNotificationAsRead(notification._id)}} className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded text-sm text-white cursor-pointer">
                 Mark as Read
              </button>
              :
              <button className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded text-sm text-white cursor-pointer">
                   <span className="flex gap-2"><CheckCheck size={16} style={{ position: "relative", top: 3 }} /> Read</span>
              </button>
            }    

            </div>
          </div>
            
          </div>
        ))
      ) : (
        <div className="w-full p-6 text-center text-gray-500 bg-gray-50 rounded-lg shadow-sm fixed">
          <p className="text-lg font-semibold">No notifications found</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
