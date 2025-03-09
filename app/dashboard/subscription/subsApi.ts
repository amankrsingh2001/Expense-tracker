"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { DateRange } from "react-day-picker";


enum PaymentFrequency {
    MONTHLY = "monthly",
    YEARLY = "yearly",
  }
export interface SubscriptionType{
    name: string;
    id: string;
    createdAt: Date;
    notes: string | null;
    userId: string;
    price: number;
    updateAt: Date;
    paid: PaymentFrequency;
    url: string;
    active: boolean;
    cancelled_at: Date | null;
    renewal_date: Date | null;
}

export async function getSubsData (date:DateRange){
    const session = await getServerSession(authOptions)
    const data = await prisma.subscription.findMany({
        where:{
            userId:session?.user.id,
            createdAt: {
                gte: date.from,
                lte: date.to
                },
        }
    })
    return data as SubscriptionType[]
}