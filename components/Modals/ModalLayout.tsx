"use client"

import { Plus } from "lucide-react"
import { useState } from "react"
import IncomeModal from "./IncomeModal"
import InvestmentModal from "./InvestmentModal"
import SubscriptionModal from "./SubscriptionModal"
import ExpenseModal from "./ExpenseModal"



interface ModalType {
    type:string,
    title:string,
    api:string,
    setIncomeValue?:any,
    setExpenseValue?:any,
    setInvestValue?:any,
    setSubsValue?:any

}

export default function ModalLayout({type, title, api, setIncomeValue, setExpenseValue,setInvestValue,setSubsValue}:ModalType){

    const [modal, setModal] = useState<boolean>(false)


    return   <div className="absolute z-50 bottom-7 right-7 flex flex-col items-center group">
    <div className="group">
    <div className="relative p-3 group  rounded-full font-semibold cursor-pointer">
            <button onClick={()=>{
                setModal(!modal)
            }} className="w-12 h-12 flex items-center justify-center rounded-full  bg-blue-700">
                <Plus className="text-white w-6 h-6" />
            </button>
            </div>
      <p className="mt-2 absolute bottom-16 whitespace-nowrap opacity-0 group-hover:opacity-100 -left-2 rounded-lg border-2 border-black px-2 py-1 text-sm text-white bg-black">
        Open Add
      </p>
    </div>

    {
      type == "income" && modal &&  <IncomeModal  title={title} modal={modal} setModal={setModal} api={api} setIncomeValue={setIncomeValue} edit={false}/>
    }

    {
      type == "expense" && modal && <ExpenseModal  title ={title} modal={modal} setModal={setModal} api={api} setExpenseValue={setExpenseValue} edit={false}/>
    }
    

    {
      type == "investment" && modal && <InvestmentModal title ={title} modal={modal} setModal={setModal} api={api} setInvestValue={setInvestValue} edit={false}/>
    }

    
    {
      type == "subscription" && modal && <SubscriptionModal title ={title} modal={modal} setModal={setModal} api={api} setSubsValue={setSubsValue} edit = {false}/>
    }
  </div>
}