

import LayoutHeader from "@/components/Layout/LayoutHeader";
import { GetTotalIncome } from "../api/income/api";
import DashboardPage from "./DashboardPage";
import { GetAllExpense } from "./expense/expenseApi";
import { getInvestmentData } from "./investment/investment";
import { getSubsData } from "./subscription/subsApi";
import { IncomeValidation } from "@/common/types";
import { DateRange } from 'react-day-picker';




type incomeValue = Zod.infer<typeof IncomeValidation> & {id:string}


export default async function Dashboard(){
    const defaultDate:DateRange = {
            from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            to: new Date(Date.now()),
    }

    const getIncome = await GetTotalIncome(defaultDate)

    const expense = await GetAllExpense(defaultDate)
    const investment = await getInvestmentData(defaultDate)
    const subscription = await getSubsData(defaultDate)

    
    return (<div className={`flex-1 w-full  `}>
        
        <div className="w-full ">
            <DashboardPage initIncomeVal={getIncome} initExpenseVal={expense} initInvestmentVal={investment} initSubscription={subscription}/>
        </div>
    </div>)
}