

import LayoutHeader from "@/components/Layout/LayoutHeader";
import { GetAllExpense } from "./expenseApi";
import ExpensePage from "./ExpensePage";
import { DateRange } from "react-day-picker";




export default async function Expense(){
    const defaultDate:DateRange = {
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date(Date.now()),
    }
    
    const expense = await GetAllExpense(defaultDate)

    return <div className={`w-full`}>
        <LayoutHeader title={"Expense"}/>
        <div>

         <ExpensePage expense = {expense}/>
        </div>
    </div>
}