"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export async function getInvestmentData (){
    const session = await getServerSession(authOptions)
    const investmentData = await prisma.investment.findMany({
        where:{
            userId:session?.user.id
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
    return investmentData
}