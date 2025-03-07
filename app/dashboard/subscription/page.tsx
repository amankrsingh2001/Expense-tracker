import LayoutHeader from "@/components/Layout/LayoutHeader";
import ModalLayout from "@/components/Modals/ModalLayout";
import { Apis } from "@/lib/Apis";


export default function Subscription() {
  return (
    <div className={`w-full`}>
      <LayoutHeader title={"Subscription"} showDateCard={false} />
      <div>
        <ModalLayout type={"subscription"} title={"Add Subscription"} api={Apis.addSubscription}/>
      </div>
    </div>
  );
}
