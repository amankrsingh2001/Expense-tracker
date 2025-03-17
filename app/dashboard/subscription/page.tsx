import LayoutHeader from "@/components/Layout/LayoutHeader";
import ModalLayout from "@/components/Modals/ModalLayout";
import { Apis } from "@/lib/Apis";
import SubscriptionPage from "./SubscriptionPage";
import { getSubsData } from "./subsApi";
import { DateRange } from "react-day-picker";


export default async function Subscription() {
  const defaultDate:DateRange = {
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(Date.now()),
}

  const subsData = await getSubsData(defaultDate)

  return (
    <div className={`w-full`}>
      <LayoutHeader title={"Subscription"}  />
      <div>
        <SubscriptionPage subscriptionValue={subsData}/>

      </div>
    </div>
  );
}
