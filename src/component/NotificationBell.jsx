'use client'
import { useAuth } from "@/lib/AuthContext";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useNotification } from '@/app/context/NotificationContext';



export default function NoficationBell() {
  const {user,loading} = useAuth();
  const {notifications,fetchNotifications,currentUser} = useNotification();
  const router = useRouter();
  // fetch user data
    //  useEffect(()=>{
    //     const fetchUser = async () => {
             
    //        const result = await fetchUserWithEmail(user?.email);
    //        console.log("result for user from notificatoin= ",result);
    //        if(result?.success){
    //          setCurrentUser(result.user);
    //        }else{
    //          toast.error(result.error);
    //        }
    //     }
        
    //     if(user && !loading && user?.email){
          
    //         fetchUser();
    //     }
    //  },[user]);

    //  useEffect(()=>{
    //     //  fetchNotifications();
    //  },[currentUser]);
  return (
  <>
    
     <nav className="sm:px-8 px-6 py-3">     
       <div className="flex">
            {
              <div>
               <Bell onClick={()=>{router.push(`/${currentUser?._id}/notifications`)}} className="w-6 h-6 text-white cursor-pointer" />

              {/* Notification count badge */}
              {notifications.length > 0 && (
                <span className="absolute top-4 sm:right-31 right-29  bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              )}
           </div> 
            } 
           
            
       </div>
         
        
     
    </nav>
  </>
   
  );
}
