"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import { DateRange } from "react-day-picker"

export interface IncomeType{
    name: string;
    id: string;
    createdAt: Date;
    notes?: string;
    amount: number;
    category: string;
}


export async function GetTotalIncome(date:DateRange):Promise<IncomeType[]>{
    
    const session = await getServerSession(authOptions)

    const totalIncome = await prisma.income.findMany({
        where:{
            userId:session?.user.id,
            createdAt: {
                gte: date.from ,
                lte:  date.to
                  },
        },
        select:{
            id:true,
            name:true,
            notes:true,
            amount:true,
            createdAt:true,
            category:true
        }
    })
    return totalIncome as IncomeType[];
}