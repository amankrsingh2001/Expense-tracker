import { SubscriptionValidation } from "@/common/types";
import { customError } from "@/lib/Error";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";

export const POST = async(req:NextRequest)=>{
    const session = await getServerSession(authOptions)
    const data = await req.json()
    console.log(data)
 
    try {
        const parseData = SubscriptionValidation.safeParse(data)
        console.log(parseData)
        
        if(!parseData.success){
            throw new customError("Invaid Data", 411)
        }
        if(!session?.user.id){
            throw new customError("User isn't valid", 401)
        }
        let renewalDate
        if(parseData.data.paid === "monthly"){
             renewalDate = new Date(parseData.data.boughtDate)
            renewalDate.setMonth(renewalDate.getMonth()+1)
        }else{
             renewalDate = new Date(parseData.data.boughtDate)
            renewalDate.setMonth(renewalDate.getFullYear()+1)
        }
        console.log(renewalDate)
        
        const createSubscription = await prisma.subscription.create({
            data:{
                name:parseData.data.name,
                notes:parseData.data.notes,
                price:parseInt(parseData.data.price),
                createdAt:new Date(parseData.data.boughtDate),
                paid:parseData.data.paid,
                active:true,
                renewal_date:renewalDate,
                url:parseData.data.url,
                userId:session.user.id
            }
        })
     

        if(!createSubscription.id){
            throw new customError("Failed to Add subscription", 411)
        }

        return NextResponse.json({
            message:"Subscription Added Successfully",
            success:true,
            subscription:createSubscription
        },{
            status:200
        })
    } catch (error) {
        if(error instanceof customError){
            return NextResponse.json({
                success:false,
                message:error.message
            },{
                status:error.status
            })
        }
       else {
        const err = (error as Error).message
        return NextResponse.json({
            success:false,
            message:err
        },{
            status:500
        })
       }
    }
}