"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"


export async function GetAllExpense(){
    const session = await getServerSession(authOptions)
    const result = await prisma.expense.findMany({
        where:{
            userId:session?.user.id
        }
    })
    return result
}