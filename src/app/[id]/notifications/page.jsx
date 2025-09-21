"use client";
import NotificationBar from "@/component/NotificationBar";
import Notifications from "@/component/Notifications";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNotification } from "@/app/context/NotificationContext";

const page = () => {
  // const params = useParams();
  // const id = params.id;

   const {loadingNotifications,notifications} = useNotification();

  
  // set state for all, Unread, read notification type
  const [allNotifications, setAllNotifications] = useState(true);
  const [unreadNotifications, setUnreadNotications] = useState(false);
  const [readNotifications, setReadNotifications] = useState(false);
  
  // useEffect(() => {
  //   const fetchNotification = async () => {
  //     const result = await fetchNotifications(id);
  //     console.log(" result= ", result);
  //     if (result?.success) {
  //       setNotifications(result.notifications.notifications);
  //     } else {
  //       toast.error(result.error);
  //     }
  //     setLoading(false);
  //   };
  //   fetchNotification();
  // }, []);
  return (
  <>
    
    <div className="flex flex-col  items-center  min-h-screen bg-gray-200 px-4 text-black">
      
      <NotificationBar
        setAllNotifications={setAllNotifications}
        setUnreadNotications={setUnreadNotications}
        setReadNotifications={setReadNotifications}
      />
      {loadingNotifications ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <Notifications
          allNotifications={allNotifications}
          unreadNotifications={unreadNotifications}
          readNotifications={readNotifications}
          toast={toast}
        />
      )}
    </div>
  </>
    
  );
};

export default page;
