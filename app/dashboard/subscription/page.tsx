import LayoutHeader from "@/components/Layout/LayoutHeader";
import ModalLayout from "@/components/Modals/ModalLayout";
import { Apis } from "@/lib/Apis";
import SubscriptionPage from "./SubscriptionPage";
import { getSubsData } from "./subsApi";


export default async function Subscription() {
  const subsData = await getSubsData()

  return (
    <div className={`w-full`}>
      <LayoutHeader title={"Subscription"} showDateCard={false} />
      <div>
        <SubscriptionPage subscriptionValue={subsData}/>
        {/* <ModalLayout type={"subscription"} title={"Add Subscription"} api={Apis.addSubscription}/> */}
      </div>
    </div>
  );
}
