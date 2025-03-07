"use client"

import LayoutHeader from "@/components/Layout/LayoutHeader";
import { LayoutDashboard } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Dashboard(){
    return (<div className={`w-full`}>
        <LayoutHeader title={"Overview"} showDateCard={true}/>
    </div>)
}