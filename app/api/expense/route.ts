

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { ExpenseValidation } from "@/common/types";
import { prisma } from "@/lib/prisma";
import { customError } from "@/lib/Error";


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

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id == null) {
      throw new customError("Id isnt valid", 401);
    }
    const session = await getServerSession(authOptions);
    const deleteField = await prisma.expense.delete({
      where: {
        id: id,
        userId: session?.user.id,
      },
    });
    return NextResponse.json(
      {
        message: "Deleted Expense Successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof customError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.status,
        }
      );
    } else {
      const err = (error as Error).message;
      return NextResponse.json(
        {
          success: false,
          message: err || "Something went wrong",
        },
        {
          status: 500,
        }
      );
    }
  }
};

export const PUT = async(req:NextRequest)=>{
  try {
    const data = await req.json()
      if(!data.id){
        throw new customError("Data Not Found", 404)
      }

      const updateExpense = await prisma.expense.update({
        where:{
          id:data.id,
        },
          data:{
            name:data.name,
            notes:data.notes,
            price:parseInt(data.price),
            category:data.category,
            updatedAt:data.updatedAt,
            paid_via:data.paid_via
        }
      })
      return NextResponse.json({
        success:true,
        updateExpense:updateExpense
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