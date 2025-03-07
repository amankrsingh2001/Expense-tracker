
import { GetTotalIncome } from "@/app/api/income/api";
import IncomePage from "@/components/IncomePage";
import LayoutHeader from "@/components/Layout/LayoutHeader";



export default async function Income() {

  const income = await GetTotalIncome();

  return (
    <div className={`w-full`}>
      <LayoutHeader title={"Income"} showDateCard={false} />

      <div>
        <IncomePage income={income} /> 
      </div>

      
       
    </div>
  );
}
