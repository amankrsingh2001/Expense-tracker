import { IncomeValidation } from "@/common/types";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";



export const Get=async(req:NextRequest)=>{
    try {
       const session = await getServerSession(authOptions)
       if(session == null || session.user == undefined){
        return NextResponse.json({
            success:false,
            message:"Session Not valid"
        })
    }
        const getAllIncome = await prisma.income.findMany({
            where:{
                userId:session.user.id
            }
        })
        if(!getAllIncome){
            return NextResponse.json({
                success:false,
                message:"Failed to fetch Your Income"
            })
        }
        return NextResponse.json({
            success:true,
            message:"Income Fetched Successfully",
            data:getAllIncome
        },{
            status:200
        })
    } catch (error) {
        const err= (error as Error).message
        return NextResponse.json({
            success:false,
            message:err
        })        
    }
}


export const  POST = async(req:NextRequest)=>{
    const session = await getServerSession(authOptions)

    if(session == null || session.user == undefined){
        return NextResponse.json({
            success:false,
            message:"Session Not valid"
        })
    }
   
    const data = await req.json()
    try {
        const parseData =  IncomeValidation.safeParse(data)
        if(!parseData.success){
            return NextResponse.json({
                success:false,
                message:"Invalid income data"
            },{
                status:411
            })
        }
        const createIncome = await prisma.income.create({
            data:{
                name:parseData.data.name,
                notes:parseData.data.notes,
                amount:parseData.data.amount,
                category:parseData.data.category,
                userId:session?.user?.id 
            }
        })
        console.log(createIncome)
        if(!createIncome || !createIncome.id){
            throw new Error("Faild to create Income")
        }
        return NextResponse.json({
            message:"Income added successfully",
            success:true
        },{
            status:200
        })
    } catch (error) {
       const err = (error as Error).message
       return NextResponse.json({
        success:false,
        message:err
       }) 
    }
    
}

