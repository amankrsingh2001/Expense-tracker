"use client"

import ShowCard from "@/components/ShowCard"
import { TotalAmount,  TotalUnit } from "@/lib/Data"
import { IndianRupee } from "lucide-react"
import { useState } from "react"
import InvestmentTable from "./InvestmentTable"
import ModalLayout from "@/components/Modals/ModalLayout"
import { Apis } from "@/lib/Apis"

const formatTable = {
  name: "Name",
  price: "Amount",
  Date: "Purchase Date",
  category: "Category",
  notes: "Notes",
  unit:"Units"
};


export default function InvestmentPage({investment}:any){
    const [investValue, setInvestValue] = useState(investment)


    const totalInvestment = TotalAmount(investValue)
    const totalUnit = TotalUnit(investValue)
  

    return   <div className=" px-4 py-4 flex flex-col gap-4">
    <h3 className="text-lg font-semibold ">Summary</h3>
    <div className="flex  gap-10">
      <ShowCard title={"Total Investment"} Amount={investment.length || 0} />
      <ShowCard
        title={"Total Invested Amount"}
        Amount={totalInvestment || 0}
        icon={<IndianRupee className="w-6 h-6 font-bold" />}
      />
       <ShowCard
        title={"Total Unit Purchased"}
        Amount={totalUnit || 0}
      />
    </div>
      <InvestmentTable formatTable={formatTable} tableData={investValue}/>

    <ModalLayout type={"investment"} title={"Add Investment"} api={Apis.addInvestment} setInvestValue ={setInvestValue}/>
   
  </div>


}