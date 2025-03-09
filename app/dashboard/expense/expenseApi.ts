"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { DateRange } from "react-day-picker"


export interface ExpenseType {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    notes: string | null;
    category: string;
    userId: string;
    price: number;
    paid_via: string;
}

export async function GetAllExpense(date:DateRange):Promise<ExpenseType[]>{

    const session = await getServerSession(authOptions)
    const result = await prisma.expense.findMany({
        where:{
            userId:session?.user.id,
            createdAt: {
                gte: date.from,
                lte: date.to
                },
        },
        select:{
            name:true,
            id:true,
            createdAt:true,
            updatedAt:true,
            notes:true,
            category:true,
            userId:true,
            price:true,
            paid_via:true
        }
    })
    return result as ExpenseType[]
}