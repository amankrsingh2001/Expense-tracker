import LayoutHeader from "@/components/Layout/LayoutHeader";
import ModalLayout from "@/components/Modals/ModalLayout";
import { Apis } from "@/lib/Apis";


export default function Investment(){
    return <div className="w-full">
        <LayoutHeader title={"Investment"} showDateCard={false}/>
    <div>
        <ModalLayout type={"investment"} title={"Add Investment"} api={Apis.addInvestment}/>
    </div>
    </div>
}