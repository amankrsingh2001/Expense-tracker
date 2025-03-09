"use client";

import { MessageSquarePlus } from "lucide-react";
import FeedbackForm from "./FeedbackForm";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LayoutValue {
  title: string;
}

export default function LayoutHeader({ title }: LayoutValue) {
  const [feedBackModal, setFeedBackModal] = useState<boolean>(false);

  return (
    <div className=" border-b-[1px] flex flex-col w-full h-[7vh]">
      <div className="flex text-black items-center h-full  px-8 border-2 ">
        <h1 className="capitalize font-bold text-3xl">{title}</h1>
        <div className="ml-auto  ">
          <div className="relative flex  gap-10 justify-around">
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
