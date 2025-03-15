"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/DatePicker";
import DateSelect from "@/components/DateSelect";
import FeedbackForm from "@/components/Layout/FeedbackForm";
import { ModeToggle } from "@/components/theme-toggler";

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
  const [feedBackModal, setFeedBackModal] = useState<boolean>(false);

  return (
    <div className=" border-b-[1px] flex flex-col  h-[7vh]">
      <div className="flex  items-center h-full  px-8 border-2 ">
        <h1 className="capitalize font-bold text-3xl">{title}</h1>
        <div className="ml-auto  ">
          <div className="relative flex gap-4 justify-around">
            <ModeToggle />
            {showDateCard && (
              <div className="flex">
                <DatePickerWithRange date={date} setDate={setDate} />
                <DateSelect />
              </div>
            )}
            <div className="relative">
              <Button
                onClick={() => {
                  setFeedBackModal(!feedBackModal);
                }}
                className="text-sm"
              >
                <MessageSquarePlus /> Feedback
              </Button>
              {feedBackModal && (
                <div className="absolute -right-10 top-10 rounded-md">
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
    </div>
  );
}
