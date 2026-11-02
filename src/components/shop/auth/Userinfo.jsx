"use client"; 
import React from "react";
import Link from "next/link"; 
import { useContext } from "react";
import { logout } from '@/services/authService';
import { AuthContext } from "@/context/AuthProvider"
export default function Userinfo() { 
    const { user, setUser } = useContext(AuthContext);   
    const handleLogout = () => {
    logout();
    setUser(null);
}
    return ( 
        <div className="flex items-center space-x-4"> 
    {!user ? (                 
    <Link                    
       href="/login" 
       className="px-3 py-1 rounded hover:bg-blue-100 hover:text-blue-800 transition-colors" 
    > 
     Login 
    </Link> 
     ) : ( 
    <>                     
    <Link                     
        href="/profile"                 
        className="px-3 py-1 rounded hover:bg-blue-100 hover:text-blue-800 transition-colors" 
    > 
     Profile 
    </Link>    
<button  onClick= {handleLogout}                    
        className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 transition-colors" 
    > 
     Logout 
</button> 
    </> 
    )} 
</div> 
    ); 
} 
