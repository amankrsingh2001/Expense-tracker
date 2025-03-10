import LayoutHeader from "@/components/Layout/LayoutHeader";
import { getInvestmentData } from "./investment";
import InvestmentPage from "./InvestmentPage";
import { DateRange } from "react-day-picker";


export default async function Investment(){
    const defaultDate:DateRange = {
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date(Date.now()),
    }
    
    const investmentData = await getInvestmentData(defaultDate)
    

    return <div className="w-full">
        <LayoutHeader title={"Investment"} />
    <div>
     <InvestmentPage investment={investmentData}/>
    </div>
    </div>
}