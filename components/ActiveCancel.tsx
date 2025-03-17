interface ShowCardDetalils{
    title:string,
    Amount:number
    icon?:React.ReactNode
    cancel?:number
}


export default function ActiveCancelCard({title, Amount, icon, cancel}:ShowCardDetalils){

    if(!cancel ){
        cancel == 0
    }

    return <div className="border-[1px]  shadow-sm h-28 w-full md:w-80 rounded-xl px-6 py-2 flex flex-col gap-2 ">
            <p className="text-sm  mt-3 font-medium text-[#71717A] font-sans  uppercase">{title||"Total Income"}</p>
            {
              <p className="font-bold text-3xl flex items-center">{Math.abs(Amount) ||0} - {cancel} </p>

            }
    
    </div>
} 