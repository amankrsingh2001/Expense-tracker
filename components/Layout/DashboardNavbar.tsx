"use client"
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { MessageSquarePlus } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

export default function DashboardNavbar(){
    const [feedBackModal, setFeedBackModal] = useState<boolean>(false)

    const pathname = usePathname()
    
    return <div className="flex text-black items-center h-full  px-8 border-2 ">
            <h1 className='capitalize font-bold text-2xl'>{pathname == "/dashboard"? "Overview":pathname.slice(11)}</h1>
            <div className='ml-auto '>
                <div className="relative ">
                <Button onClick={()=>{
                    setFeedBackModal(!feedBackModal)
                }} className='text-xs relative'><MessageSquarePlus/> Feedback</Button>
                {
                    feedBackModal && <div className='absolute -left-36 top-10 rounded-md'>
                        <FeedbackForm  feedBackModal={feedBackModal} setFeedBackModal={setFeedBackModal}/>
                    </div>

                }
                </div>
                
            </div>
    </div>
}