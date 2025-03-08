

import LayoutHeader from "@/components/Layout/LayoutHeader";
import { GetAllExpense } from "./expenseApi";
import ExpensePage from "./ExpensePage";




export default async function Expense(){
    const expense = await GetAllExpense()

    return <div className={`w-full`}>
        <LayoutHeader title={"Expense"} showDateCard={false}/>
        <div>

    <ExpensePage expense = {expense}/>
        </div>
    </div>
}