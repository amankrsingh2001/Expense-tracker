

import LayoutHeader from "@/components/Layout/LayoutHeader";
import { GetTotalIncome } from "../api/income/api";
import DashboardPage from "./DashboardPage";
import { GetAllExpense } from "./expense/expenseApi";
import { getInvestmentData } from "./investment/investment";
import { getSubsData } from "./subscription/subsApi";


export default async function Dashboard(){
    const getIncome = await GetTotalIncome()
    const expense = await GetAllExpense()
    const investment = await getInvestmentData()
    const subscription = await getSubsData()
    
    return (<div className={`w-full`}>

        
        <div >
            <DashboardPage getIncome={getIncome} getExpense={expense} getInvestment = {investment} getSubscription={subscription}/>
        </div>
    </div>)
}