"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { DateRange } from "react-day-picker"

export interface InvestmentType{
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    category: string;
    price: number;
    unit: number;
}


export async function getInvestmentData (date:DateRange){
    const session = await getServerSession(authOptions)
    const investmentData = await prisma.investment.findMany({
        where:{
            userId:session?.user.id,
            createdAt: {
                gte: date.from,
                lte: date.to
                },
        },
        select:{
            id:true,
            name:true,
            price:true,
            unit:true,
            createdAt:true,
            updatedAt:true,
            category:true
        }
    })
    return investmentData as InvestmentType[]
}