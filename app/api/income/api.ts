"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"

export async function GetTotalIncome(){
    const session = await getServerSession(authOptions)

    const totalIncome = await prisma.income.findMany({
        where:{
            userId:session?.user.id
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
    return totalIncome;
}