'use client';
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper(){
    const pathname = usePathname();
    console.log("pathname= ",pathname);
  
    // Hide Navbar on any route that starts with /admin/
  const shouldShowNavbar = !pathname.startsWith('/admin/');

  return shouldShowNavbar ? <Navbar /> : null;

}