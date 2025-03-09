"use client"
import { CrouselData } from "@/lib/curoselData"
import { useState } from "react"
import CrouselSection from "./CrouselSection"


export default function Crousel(){

    const [activeIndex, setActiveIndex] = useState(0)
    
    return <div className="px-14 w-full space-y-2  flex py-12 justify-between">    
    <div className="flex flex-col gap-1 w-[50%]">
    {
            CrouselData.map((crousel, index)=>{
             
                return (
            
                    <div className="w-full " key={index}>
                        <CrouselSection setActiveIndex={setActiveIndex} index={index} isActive={activeIndex} title={crousel.title} description={crousel.description} icon={<crousel.icon></crousel.icon>} />
                 </div>
                 
                )
             })
        }
    </div>
        <div className="">
            {
                CrouselData.map((crousel, index)=>{
                    return <div key={index}>
                      {
                        index === activeIndex && <div>
                            <video src={`crousel.video`}></video>
                        </div>
                      }

                    </div>
                })
            }
        </div>

      
    </div>
}