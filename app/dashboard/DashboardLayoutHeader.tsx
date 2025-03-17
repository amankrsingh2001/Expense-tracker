"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/DatePicker";
import DateSelect from "@/components/DateSelect";
import FeedbackForm from "@/components/Layout/FeedbackForm";
import { ModeToggle } from "@/components/theme-toggler";
import { Menu } from 'lucide-react';
import Sidebar from "@/components/Layout/Sidebar";

interface LayoutValue {
  title: string;
  showDateCard: boolean;
  date: DateRange;
  setDate: React.Dispatch<SetStateAction<DateRange>>;
}

export default function DashboardLayoutHeader({
  title,
  showDateCard,
  date,
  setDate,
}: LayoutValue) {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [feedBackModal, setFeedBackModal] = useState<boolean>(false);

  return (
    <div className="overflow-hidden flex md:h-[7vh] h-auto border-b-2 border-black">
    <div className="flex w-full flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3">
      <div onClick={()=>setShowMenu(!showMenu)} className="">
        <Menu/>
        
      </div>
      
      {
        showMenu && <div onClick={()=>setShowMenu(!showMenu)} className="inset-0 fixed z-[1001] w-screen h-screen top-0 left-0 bg-opacity-0 backdrop-blur-md block md:hidden"> <Sidebar classname="flex md:hidden"/> </div>
      }
     
     
      
      {/* Title */}
      <h1 className="capitalize font-bold text-lg md:text-3xl w-full md:w-[50%] text-center md:text-left">
        {title}
      </h1>
  
      {/* Controls Section */}
      <div className="w-full md:w-[45%] flex justify-around md:justify-end gap-4 md:gap-6">
        <ModeToggle />
  
        {/* Date Picker - Only show if enabled */}
        {showDateCard && (
          <div className="flex">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        )}
  
        {/* Feedback Button - Visible only on larger screens */}
        <div className="relative hidden md:block">
          <Button
            onClick={() => setFeedBackModal(!feedBackModal)}
            className="text-sm"
          >
            <MessageSquarePlus /> Feedback
          </Button>
          
          {/* Feedback Modal */}
          {feedBackModal && (
            <div className="absolute right-0 top-10 rounded-md">
              <FeedbackForm
                feedBackModal={feedBackModal}
                setFeedBackModal={setFeedBackModal}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  
  );
}
