import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const NotificationBar = ({
  setAllNotifications,
  setUnreadNotifications,
  setReadNotications,
}) => {
  return (
    <div className="bg-gray-100 w-full  p-4 shadow-lg sticky top-16 z-10 cursor-pointer mb-2">
      <div className="flex justify-between">
        {/* left side */}
        <div className="flex gap-4 max-[600px]:mt-2">
          <div>
            <NotificationsIcon
              sx={{
                fontSize: 40,
                "@media (max-width:600px)": { fontSize: 30 },
              }}
            />
          </div>
          <div>
            <p className="font-bold text-2xl max-[600px]:text-lg">
              Notifications
            </p>
            <p className="text-gray-500 max-[600px]:text-xs">All caught up!</p>
          </div>
        </div>

        {/* right side */}
        <div className="flex gap-4 max-[600px]:flex-col ">
          <div className="">
            <button className=" bg-gray-200  text-gray-600 px-4 py-2 rounded hover:bg-gray-300 hover:text-gray-800 transition cursor-pointer max-[600px]:px-3 max-[600px]:py-1.5  max-[600px]:text-xs">
              Marks All Read
            </button>
          </div>

          <div>
            <button
              className="
               flex items-center gap-2 
               bg-red-50 text-red-500 
               px-4 py-2 rounded 
               hover:bg-red-100 hover:text-red-600 
               transition
               cursor-pointer
               max-[600px]:px-3 max-[600px]:py-1.5  max-[600px]:text-xs
               "
            >
              <span>
                <DeleteForeverIcon
                  sx={{ "@media (max-width:600px)": { fontSize: 20 } }}
                />
              </span>
              <span>Clear all</span>
            </button>
          </div>
        </div>
      </div>

      {/* filter options */}
      <div className="mt-8  flex border-t border-gray-300">
        <div className="mr-2 mt-4 bg-blue-100 text-blue-400 px-5 py-1 max-[600px]:px-5 max-[600px]:py-2  max-[600px]:text-xs rounded hover:bg-blue-200">
          <button onClick={()=>setAllNotifications(true)}>All</button>
        </div>
        <div className="mr-2 mt-4 bg-blue-100 text-blue-400 px-5 py-1 max-[600px]:px-5 max-[600px]:py-2  max-[600px]:text-xs rounded hover:bg-blue-200">
          <button onClick={()=>setUnreadNotifications(true)}>Unread</button>
        </div>
        <div className="mr-2 mt-4 bg-blue-100 text-blue-400 px-5 py-1 max-[600px]:px-5 max-[600px]:py-2  max-[600px]:text-xs rounded hover:bg-blue-200">
          <button onClick={()=>setReadNotications(true)}>Read</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
