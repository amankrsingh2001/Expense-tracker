
import { GetTotalIncome } from "@/app/api/income/api";
import IncomePage from "@/components/IncomePage";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import { DateRange } from "react-day-picker";



export default async function Income() {

  const defaultDate:DateRange = {
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(Date.now()),
}

  const income = await GetTotalIncome(defaultDate);

  return (
    <div className={`w-full`}>
      <LayoutHeader title={"Income"}  />

      <div>
        <IncomePage income={income} /> 
      </div>

      
       
    </div>
  );
}
