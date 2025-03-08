import {  InvestmentValidation } from "@/common/types";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";


export const GET = async(req:NextRequest)=>{
    try {
        const session = await getServerSession(authOptions)

        if(session == null || session.user == undefined){
            return NextResponse.json({
                success:false,
                message:"Session Not valid"
            },{
                status:404
            })
        }
        const getAllExpense = await prisma.investment.findMany({
            where:{
                userId:session.user.id
            }
        })
        if(getAllExpense == null){
            throw new Error('Falied to fetch expense')
        }
        return NextResponse.json({
            success:true,
            message:"Fetched Expenses Successfully",
            expense:getAllExpense
        },{
            status:200
        })
    } catch (error) {
        const err = (error as Error).message
        return NextResponse.json({
            success:false,
            message:err || "Something went wrong"
        },{
            status:500
        })
    }
}

export const POST = async(req:NextRequest)=>{
    const data = await req.json()
    console.log(data)
    try {
        const session = await getServerSession(authOptions)
        if(session == null || session.user == undefined){
                return NextResponse.json({
                    success:false,
                    message:"Session Not valid"
                })
            }
        const parseData = InvestmentValidation.safeParse(data)

        console.log(parseData.error)
  
        if(!parseData.success){
            return NextResponse.json({
                success:false,
                message:"Invalid Data"
            },{
                status:411
            })
        }

        const createInvestment = await prisma.investment.create({
            data:{
                name:parseData.data.name,
                notes:parseData.data.notes,
                createdAt:new Date(parseData.data.boughtDate),
                price:parseInt(parseData.data.stockPrice),
                unit:parseInt(parseData.data.units),
                category:parseData.data.category,
                userId:session?.user.id
            }
        })

        if(!createInvestment || !createInvestment.id){
            throw new Error("Faild to create Investment")
        }
        return NextResponse.json({
            success:true,
            message:"Investment Added Successfully",
            investment:createInvestment
        },{
            status:200
        })
    } catch (error) {
        const err = (error as Error).message
        return NextResponse.json({
                success:false,
                message:err || "Something went wrong"
        },{
            status:500
        })
    }
}