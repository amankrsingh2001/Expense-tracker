import { SubscriptionValidation } from "@/common/types";
import { customError } from "@/lib/Error";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";

export const POST = async(req:NextRequest)=>{
    const session = await getServerSession(authOptions)
    const data = await req.json()

 
    try {
        const parseData = SubscriptionValidation.safeParse(data)

        
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
            renewalDate.setFullYear(renewalDate.getFullYear()+1)
        }

        
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

export const DELETE = async(req:NextRequest)=>{
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const session = await getServerSession(authOptions)
        if(!id || !session?.user.id){
            throw new customError("Id Not found", 404)
        }
        const deleteSubs = await prisma.subscription.delete({
            where:{
                id:id,
                userId:session.user.id
            }
        })
        return NextResponse.json({
            success:true,
            message:"Removed Subscription successfully"
        })
    } catch (error) {
        if(error instanceof customError){
            return NextResponse.json({
                success:false,
                message:error.message
            },{
                status:error.status
            })
        }else{
            const err = (error as Error).message
            return NextResponse.json({
                message:err,
                success:false
            },{
                status:500
            })
        }
    }
}

export const PUT = async(req:NextRequest)=>{
    try {
        const data = await req.json()


        if(!data.id || !data.userId){
            throw new customError("Data isnt valid", 404)
        }
        const updateSubs = await prisma.subscription.update({
            where:{
                id:data.id,
                userId:data.userId
            },
            data:{
                    id: data.id,
                    name: data.name,
                    notes: data.notes,
                    price: parseInt(data.price),
                    updateAt: data.updateAt,
                    paid: data.paid,
                    url: data.url,
                    active: data.active,
                    cancelled_at: data.cancelled_at,
                    renewal_date: data.renewal_date,
            }
        })
        if(!updateSubs.id){
            throw new customError("Failed to edit data", 404)
        }
        return NextResponse.json({
            success:true,
            data:updateSubs,
            message:"Updated Subcription successfully"
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
        }else{
            const err = (error as Error).message
            return NextResponse.json({
                message:err,
                success:false
            },{
                status:500
            })
        }

    }
}