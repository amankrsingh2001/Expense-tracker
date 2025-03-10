"use client";

import { Apis } from "@/lib/Apis";
import { useState } from "react";
import ModalLayout from "../../../components/Modals/ModalLayout";
import { TotalAmount } from "@/lib/Data";
import ShowCard from "../../../components/ShowCard";
import { IndianRupee } from "lucide-react";
import TableFormat from "../../../components/Table";

interface ExpenseData {
  expense: any;
}

const formatTable = {
  name: "Name",
  price: "Amount",
  Date: "Spent Date",
  category: "Category",
  notes: "Notes",
  paidVia:"Paid Via"
};


export default function ExpensePage({ expense }: ExpenseData) {
  const [expenseValue, setExpenseValue] = useState<any>(expense);

  const totalAmount = TotalAmount(expenseValue);
  

  return (
    <div className=" px-4 py-4 flex flex-col gap-4">
      <h3 className="text-lg font-semibold ">Summary</h3>
      <div className="flex  gap-10">
        <ShowCard title={"Total Expense"} Amount={expenseValue.length || 0} />
        <ShowCard
          title={"Total Amount"}
          Amount={totalAmount || 0}
          icon={<IndianRupee className="w-6 h-6 font-bold" />}
        />
      </div>

      <TableFormat formatTable={formatTable} tableData={expenseValue} setValue={setExpenseValue} api={Apis.addExpense}/>

      <ModalLayout
        type={"expense"}
        title={"Add Income"}
        api={Apis.addExpense}
        setExpenseValue={setExpenseValue}
      />
    </div>
  );
}
