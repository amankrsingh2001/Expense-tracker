"use client";

import React, { useState } from "react";
import {
  TotalAmount,
  TotalAmountInvested,
  TotalSubscription,
} from "@/lib/Data";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import { IndianRupee } from "lucide-react";
import ShowCard from "@/components/ShowCard";
import SecondChart from "./SecondChart";
import FirstChart from "./FirstChart";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

interface DashboardData {
  getIncome: any;
  getExpense: any;
  getInvestment: any;
  getSubscription: any;
}

export default function DashboardPage({
  getIncome,
  getExpense,
  getInvestment,
  getSubscription,
}: DashboardData) {

  const [date, setDate] = useState<DateRange >({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: addDays(new Date(Date.now()), 0),
  });

  const totalIncome = TotalAmount(getIncome);
  const totalExpense = TotalAmount(getExpense);
  const totalInvestment = TotalAmountInvested(getInvestment);
  const totalSubscription = TotalSubscription(getSubscription);
  const avilableBalance =
    totalIncome - (totalExpense + totalInvestment + totalSubscription);

  
  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
    { name: "Investment", value: totalInvestment },
    { name: "Subscription", value: totalSubscription },
    { name: "Avilable Balance", value: avilableBalance },
  ];

  return (
    <div>
      <LayoutHeader title={"Overview"} showDateCard={true} date={date} setDate={setDate}/>
      <div className=" px-4 py-4 flex flex-col gap-4">
        <div className="flex  gap-10">
          <ShowCard
            title={"Total Income"}
            Amount={totalIncome || 0}
            icon={<IndianRupee className="w-6 h-6 font-bold" />}
          />
          <ShowCard
            title={"Avilable Balance"}
            Amount={avilableBalance || 0}
            icon={<IndianRupee className="w-6 h-6 font-bold" />}
          />
          <ShowCard
            title={"Total Expense "}
            Amount={totalExpense || 0}
            icon={<IndianRupee className="w-6 h-6 font-bold" />}
          />

          <ShowCard title={"Total Investment"} Amount={totalInvestment || 0} />
          <ShowCard
            title={"Total Subscription"}
            Amount={totalSubscription || 0}
          />
        </div>
        <div className="flex justify-around">
          <FirstChart expense={getExpense} />
          <SecondChart data={data} />
        </div>
      </div>
    </div>
  );
}
