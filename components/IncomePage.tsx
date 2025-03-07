"use client";

import { IndianRupee } from "lucide-react";
import ShowCard from "./ShowCard";

import { TotalAmount } from "@/lib/Data";
import TableFormat from "./Table";
import ModalLayout from "@/components/Modals/ModalLayout";
import { Apis } from "@/lib/Apis";

import { useEffect, useState } from "react";

const formatTable = {
  name: "Name",
  amount: "Amount",
  Date: "Recieved Date",
  category: "Category",
  notes: "Notes",
};

export default function IncomePage({ income }: any) {
  const [incomeValue, setIncomeValue] = useState<any>(income);

  const totalAmount = TotalAmount(incomeValue);

  return (
    <div className=" px-4 py-4 flex flex-col gap-4">
      <h3 className="text-lg font-semibold ">Summary</h3>
      <div className="flex  gap-10">
        <ShowCard title={"Total Income"} Amount={income.length || 0} />
        <ShowCard
          title={"Total Amount"}
          Amount={totalAmount || 0}
          icon={<IndianRupee className="w-6 h-6 font-bold" />}
        />
      </div>

      <TableFormat formatTable={formatTable} tableData={incomeValue} />

      <ModalLayout
        type={"income"}
        title={"Add Income"}
        api={Apis.addIncome}
        setIncomeValue={setIncomeValue}
      />
    </div>
  );
}
