import Navbar from "@/components/LandingPage/Navbar";
import DashboardNavbar from "@/components/Layout/DashboardNavbar";
import Sidebar from "@/components/Layout/Sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return <div className="flex">
        <Sidebar/>
        <div className="w-full ">
        <div className="border-b-[1px]  flex flex-col w-full h-[6vh]">
            <DashboardNavbar/>
        </div>
        {children}
        </div>
        
    </div>
}
