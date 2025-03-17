

import Sidebar from "@/components/Layout/Sidebar";
import React,{useState} from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    
    return <div className="w-screen h-screen flex">
        <Sidebar classname={ "max-md:hidden "}/>
        {children}
    </div>
}
