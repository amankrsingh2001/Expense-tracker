import LayoutHeader from "@/components/Layout/LayoutHeader";
import ModalLayout from "@/components/Modals/ModalLayout";
import { Apis } from "@/lib/Apis";
import { getInvestmentData } from "./investment";
import InvestmentPage from "./InvestmentPage";


export default async function Investment(){
    const investmentData = await getInvestmentData()
    

    return <div className="w-full">
        <LayoutHeader title={"Investment"} showDateCard={false}/>
    <div>
     <InvestmentPage investment={investmentData}/>
    </div>
    </div>
}