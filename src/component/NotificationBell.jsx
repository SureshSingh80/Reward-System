import { Bell } from "lucide-react";

export default function NoficationBell() {
  return (
    <nav className="sm:px-8 px-6 py-3">
     
       <div className="flex">
            <Bell className="w-6 h-6 text-white" />
            {/* Notification count badge */}
            <span className="absolute top-4 sm:right-31 right-29  bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                3
            </span>
       </div>
         
        
     
    </nav>
  );
}
