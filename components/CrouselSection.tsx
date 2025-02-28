import React from "react";
import { ChevronsDown, ChevronsUp } from 'lucide-react';

interface CrouselData{
    title:string,
    description:string,
    video?:string,
    isActive:number,
    index:number,
    icon?:any,
    setActiveIndex:React.Dispatch<React.SetStateAction<number>>
}

export default function CrouselSection({title, description, isActive, index, setActiveIndex, icon, video}:CrouselData){

    return <div className="">
        <div className="relative">   

           {
            index == isActive ? <ChevronsDown className="absolute right-4 top-3 h-5 w-5"/>:<ChevronsUp className="absolute right-4 top-3 h-5 w-5"/>
           } 
           

            <h1 className="text-md font-semibold text-black bg-[#bdbdbd] px-2 py-2 rounded-md flex gap-2" onClick={()=>setActiveIndex(index)}>{icon}{title}</h1>

        </div>

        {
            isActive==index ? <p className="font-semibold text-white bg-clip-text text-sm px-2 py-3 font-mono ">{description}</p>:""
        }
      
    </div>
}