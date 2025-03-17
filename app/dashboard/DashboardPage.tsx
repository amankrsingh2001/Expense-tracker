"use client";

import React, { useEffect, useState } from "react";
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
import { GetTotalIncome, IncomeType } from "../api/income/api";
import { ExpenseType, GetAllExpense } from "./expense/expenseApi";
import { getInvestmentData, InvestmentType } from "./investment/investment";
import { getSubsData, SubscriptionType } from "./subscription/subsApi";
import DashboardLayoutHeader from "./DashboardLayoutHeader";
import ModalLayout from "@/components/Modals/ModalLayout";
import { Apis } from "@/lib/Apis";

interface DashboardData {
  initIncomeVal: IncomeType[];
  initExpenseVal: ExpenseType[];
  initInvestmentVal: InvestmentType[];
  initSubscription: SubscriptionType[];
}

type ChartDataItem = {
  name: string;
  value: number;
};


export default function DashboardPage({
  initIncomeVal,
  initExpenseVal,
  initInvestmentVal,
  initSubscription,
}: DashboardData) {


  const [date, setDate] = useState<DateRange >({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: addDays(new Date(Date.now()), 0),
  });

  const [income, setIncome] = useState<IncomeType[]>(initIncomeVal)
  const [expense, setExpense] = useState<ExpenseType[]>(initExpenseVal)
  const [investment, setInvestment] = useState<InvestmentType[]>(initInvestmentVal)
  const [subscription, setSubscription] = useState<SubscriptionType[]>(initSubscription)
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const getIncomeValue = async ()=>{
    const incomeWithDate = await GetTotalIncome(date)
    return incomeWithDate
  }

  const getExpenseValue = async()=>{
    const expenseWithDate = await GetAllExpense(date)
    return expenseWithDate
  }

  const getInvestmentValue = async()=>{
    const investmentWithDate = await getInvestmentData(date)
    return investmentWithDate
  }

  const getSubscriptionValue = async()=>{
    const subscriptionWithDate = await getSubsData(date)
    return subscriptionWithDate
  }


  useEffect(()=>{
    const setIncomeValue = async()=>{
      const incomeValue = await getIncomeValue()
      setIncome(incomeValue)
    }  
    const setInvestmentValue =async()=>{
      const investmentValue = await getInvestmentValue()
      setInvestment(investmentValue)
    }
    const setSubscriptionValue =async()=>{
      const subscriptionValue = await getSubscriptionValue()
      setSubscription(subscriptionValue)
    }
    const setExpenseValue = async()=>{
      const expenseValue = await getExpenseValue()
      setExpense(expenseValue)
    }

    
    setIncomeValue()
    setExpenseValue()
    setInvestmentValue()
    setSubscriptionValue()
    
  },[date])

  useEffect(() => {
    setChartData([
      { name: "Income", value: totalIncome },
      { name: "Expense", value: totalExpense },
      { name: "Investment", value: totalInvestment },
      { name: "Subscription", value: totalSubscription },
      { name: "Available Balance", value: totalIncome - (totalExpense + totalInvestment + totalSubscription) },
    ]);
  }, [income, expense, investment, subscription, date]);




  const totalIncome = TotalAmount(income);
  const totalExpense = TotalAmount(expense);
  const totalInvestment = TotalAmountInvested(investment);
  const totalSubscription = TotalSubscription(subscription);
  const avilableBalance = totalIncome - (totalExpense + totalInvestment + totalSubscription);

  


  return (
    <div className="w-full">
      <DashboardLayoutHeader title={"Overview"} showDateCard={true} date={date} setDate={setDate} />
      <div className=" px-4 py-4 flex flex-col gap-4 justify-center items-center ">
        <div className="flex  gap-10 flex-col md:flex-row md:flex-wrap  w-full  justify-center">
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
        <div className="flex justify-around flex-col md:flex-row w-full">
          <FirstChart expense={expense} />
          <SecondChart data={chartData} />
        </div>
         <ModalLayout
                type={"expense"}
                title={"Add Income"}
                api={Apis.addExpense}
                setExpenseValue={setExpense}
              />
      </div>
    </div>
  );
}
