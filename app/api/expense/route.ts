

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { ExpenseValidation } from "@/common/types";
import { prisma } from "@/lib/prisma";


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
        const getAllExpense = await prisma.expense.findMany({
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
    try {
        const session = await getServerSession(authOptions)
        if(session == null || session.user == undefined){
                return NextResponse.json({
                    success:false,
                    message:"Session Not valid"
                })
            }
        const parseData = ExpenseValidation.safeParse(data)
        if(!parseData.success){
            return NextResponse.json({
                success:false,
                message:"Invalid Data"
            },{
                status:411
            })
        }

        const createExpense = await prisma.expense.create({
            data:{
                name:parseData.data.name,
                notes:parseData.data.notes,
                price:parseInt(parseData.data.price),
                createdAt:new Date(parseData.data.spentDate),
                paid_via:parseData.data.paidVia,
                category:parseData.data.category,
                userId:session?.user.id
            }
        })

        if(!createExpense || !createExpense.id){
            throw new Error("Faild to create Expense")
        }
        return NextResponse.json({
            success:true,
            message:"Expense Added Successfully",
            expense:createExpense
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