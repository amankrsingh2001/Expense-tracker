import { IncomeValidation } from "@/common/types";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { customError } from "@/lib/Error";



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
                amount:parseInt(parseData.data.amount),
                category:parseData.data.category,
                createdAt:new Date(parseData.data.recievedDate),
                userId:session?.user?.id
            },
            select:{
                id:true,
                name:true,
                notes:true,
                category:true,
                createdAt:true,
                amount:true,


            }
        })

        if(!createIncome || !createIncome.id){
            throw new Error("Faild to create Income")
        }

        console.log(createIncome)
      

        return NextResponse.json({
            message:"Income added successfully",
            success:true,
            newIncome:createIncome
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

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id == null) {
      throw new customError("Id isnt valid", 401);
    }
    const session = await getServerSession(authOptions);
    const deleteField = await prisma.income.delete({
      where: {
        id: id,
        userId: session?.user.id,
      },
    });
    return NextResponse.json(
      {
        message: "Deleted Income Successfully",
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