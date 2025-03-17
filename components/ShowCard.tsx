import { formattedAmount } from "@/lib/Data"

interface ShowCardDetalils{
    title:string,
    Amount:number
    icon?:React.ReactNode

}


export default function ShowCard({title, Amount, icon}:ShowCardDetalils){

    return <div className="border-[1px]  shadow-sm h-28   border-black md:w-72 rounded-xl px-6 py-2 flex flex-col gap-2 ">
            <p className="text-sm  mt-3 font-medium text-[#71717A] font-sans  uppercase">{title||"Total Income"}</p>
            {
              <p className="font-bold text-3xl flex items-center">{`${(Amount)<0?"-":""}`}<span className="font-bold">{icon}</span>{formattedAmount(Math.abs(Amount)) ||0}  </p>

}
    
    </div>
} 