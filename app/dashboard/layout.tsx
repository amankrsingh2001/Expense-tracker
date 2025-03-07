import Navbar from "@/components/LandingPage/Navbar";

import Sidebar from "@/components/Layout/Sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return <div className="flex">
        <Sidebar/>
        {children}
    </div>
}
