import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";


class customError extends Error{
    status:number
    constructor(error:string, status:number){
        super(error)
        this.status= status
    }
}

export const POST = async(req:NextRequest)=>{
    try {
        const data = await req.json()
        const session = await getServerSession(authOptions)
      
        if(!data.details || !session?.user.id){
            return NextResponse.json({
                success:false,
                message:"Details not found"
            },{
                status:404
            })
        }
        
        const createFeedback = await prisma.feedback.create({
            data:{
                details:data.details,
                userId:session?.user.id
            }
        }) 
       
        if(!createFeedback.id){
            throw new customError("Failed to add feedback", 402)
        }

        return NextResponse.json({
            success:true,
            message:"Feedback Created"
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
            success:false,
            message:err || "Something went wrong"
        },{
            status:500
        })
    }
        }
        
}