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
    <div className="flex flex-col border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
    <div className="flex items-center justify-between px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200 md:text-2xl lg:text-3xl">
          {title}
        </h1>
      </div>
  

      <div className="flex items-center gap-4">

        {showDateCard && (
          <div className="hidden md:flex">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        )}

  

        <div className="relative ">
          <Button
            onClick={() => setFeedBackModal(!feedBackModal)}
            variant="outline"
            className="gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Feedback
          </Button>
          
          {feedBackModal && (
            <div className="absolute right-0 top-12 z-50 rounded-lg border bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <FeedbackForm
                feedBackModal={feedBackModal}
                setFeedBackModal={setFeedBackModal}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  

    {showDateCard && (
      <div className="flex border-t md:hidden px-4 py-3">
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
    )}
  

    {showMenu && (
      <div 
        onClick={() => setShowMenu(false)}
        className="inset-0 fixed z-[1001] w-screen h-screen top-0 left-0 bg-opacity-0 backdrop-blur-md block md:hidden"
      >
        <div 
          className="w-[80%] min-w-[300px]  dark:bg-slate-900 h-full animate-in "
          
        >
          <Sidebar />
        </div>
      </div>
    )}
  </div>
  
  );
}
