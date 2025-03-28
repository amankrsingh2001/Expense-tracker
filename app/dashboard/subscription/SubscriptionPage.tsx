"use client";

import { Apis } from "@/lib/Apis";
import { useState } from "react";
import ModalLayout from "../../../components/Modals/ModalLayout";
import { TotalActive, TotalActiveMonthly, TotalActiveYearly, TotalAmount } from "@/lib/Data";
import ShowCard from "../../../components/ShowCard";
import { IndianRupee } from "lucide-react";
import SubscriptionTable from "./SubscriptionTable";
import ActiveCancelCard from "@/components/ActiveCancel";

interface Subs {
  subscriptionValue: any;
}

const formatTable = {
  name: "Name",
  price: "Price",
  RenewalDate: "Renewal Date",
  StartDate:"Start/Cancel Date",
  notes: "Notes",
  paidVia:"Paid Via",
  status:"Status"
};


export default function SubscriptionPage({ subscriptionValue }: Subs) {
  const [subsValue, setSubsValue] = useState<any>(subscriptionValue);

  const totalAmountMonthly = TotalActiveMonthly(subsValue);
  const totalAmountYearly = TotalActiveYearly(subsValue)

  const active = TotalActive(subsValue)

  const cancel = subsValue.length-active;



  return (
    <div className=" px-4 py-4 flex flex-col gap-4" >
      <h3 className="text-lg font-semibold ">Summary</h3>
      <div className="flex  gap-10 flex-col md:flex-row">
         <ShowCard title={"Total Subscription"} Amount={subsValue.length || 0} />
       
         <ActiveCancelCard
          title={"Active - Cancel"}
          Amount={active}
          cancel={cancel}
        /> 
         <ShowCard
          title={"Total Active Monthly"}
          Amount={totalAmountMonthly || 0}
          icon={<IndianRupee className="w-6 h-6 font-bold" />}
        /> 
           <ShowCard
          title={"Total Active Yearly"}
          Amount={totalAmountYearly || 0}
          icon={<IndianRupee className="w-6 h-6 font-bold" />}
        /> 
      </div>

      <SubscriptionTable formatTable={formatTable} tableData={subsValue} setSubsValue={setSubsValue} />

      <ModalLayout
        type={"subscription"}
        title={"Add Subscription"}
        api={Apis.addSubscription}
        setSubsValue={setSubsValue}
      />
    </div>
  );
}
