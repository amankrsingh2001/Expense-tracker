"use client";

import { useEffect, useState } from "react";

import { IndianRupee } from "lucide-react";
import { Landmark } from "lucide-react";
import { Wallet } from "lucide-react";
import { ReceiptIndianRupee } from "lucide-react";
import { BadgeIndianRupee } from "lucide-react";
import { Clapperboard } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Cog } from "lucide-react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function Sidebar({classname=""}:{classname?:string}) {
  const [active, setActive] = useState<string>('/dashboard')

  const pathname = usePathname()

  useEffect(()=>{
    setActive(pathname)
  },[pathname])

  const router = useRouter();
  return (
    <div className={`w-[10%] sm:w-[8%] md:w-[6%]  lg:w-[4%] bg-black h-full flex-col items-center ${classname}`}>

      <div className="h-[3.5vw] w-[60%]  flex justify-center items-center gap-1 border-b-[1px] border-slate-400">
        <IndianRupee className="h-5 w-5 text-white" />
        <p className="font-serif text-lg text-white">TP</p>
      </div>

      <div className="text-white mt-8 flex flex-col gap-8 ">
        <div className={`relative group  hover:bg-[#333333] ${active == "/dashboard"? "bg-[#333333]" : ""} rounded-md `}>
          <p className="absolute z-10 left-10 bottom-1 bg-[#1c1c1c] px-2 py-2 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all delay-200">
            Overview
          </p>
          <button
            className="px-2 py-2"
            onClick={() => router.push("/dashboard")}
          >
            <Wallet className="" />
          </button>
        </div>

        <div className={`relative group  hover:bg-[#333333]  ${active == "/dashboard/income"? "bg-[#333333]" : ""}  rounded-md `}>
          <p className="absolute z-10  left-10 bottom-1 bg-[#1c1c1c] px-2 py-2 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all delay-200">
            Income
          </p>
          <button
            className="px-2 py-2"
            onClick={() => router.push("/dashboard/income")}
          >
            <Landmark />
          </button>
        </div>

        <div className={`relative group  hover:bg-[#333333]  ${active == "/dashboard/expense"? "bg-[#333333]" : ""}  rounded-md ` }>
          <p className="absolute z-10  left-10 bottom-1 bg-[#1c1c1c] px-2 py-2 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all delay-200">
            Expense
          </p>
          <button
            className="px-2 py-2"
            onClick={() => router.push("/dashboard/expense")}
          >
            <ReceiptIndianRupee />
          </button>
        </div>

        <div className={`relative group  hover:bg-[#333333]  ${active == "/dashboard/investment"? "bg-[#333333]" : ""}  rounded-md ` }>
          <p className="absolute z-10  left-10 bottom-1 bg-[#1c1c1c] px-2 py-2 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all delay-200">
            Investment
          </p>
          <button
            className="px-2 py-2"
            onClick={() => router.push("/dashboard/investment")}
          >
            <BadgeIndianRupee />
          </button>
        </div>

        <div className={`relative group  hover:bg-[#333333]  ${active == "/dashboard/subscription"? "bg-[#333333]" : ""}  rounded-md ` }>
          <p className="absolute z-10  left-10 bottom-1 bg-[#1c1c1c] px-2 py-2 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all delay-200">
            Subscription
          </p>
          <button
            className="px-2 py-2"
            onClick={() => router.push("/dashboard/subscription")}
          >
            <Clapperboard />
          </button>
        </div>
      </div>

      <div className="text-white  mt-auto py-6 flex flex-col gap-6 ">
        <div className="hover:bg-[#333333]  rounded-md">
          <button className="self-center px-2 py-2">
            <a href="mailto:singhamankr17@gmail.com">
              <CircleHelp className="" />
            </a>
          </button>
        </div>

        <div className="hover:bg-[#333333]  rounded-md">
          <button
            className="self-center px-2 py-2"
            onClick={()=>toast.success('...Under Construction')}
          >
            <Cog />
          </button>
        </div>

        <div className="hover:bg-[#333333]  rounded-md relative group ">
          <p className="absolute left-12 bottom-1 bg-[#1c1c1c] px-2 py-2 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all delay-200 whitespace-nowrap">
            Sign out
          </p>
          <button
            className="self-center px-2 py-2"
            onClick={() => {
              signOut({
                callbackUrl: "/auth/signin",
              });
            }}
          >
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
}
