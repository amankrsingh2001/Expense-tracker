"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getSubsData (){
    const session = await getServerSession(authOptions)
    const data = await prisma.subscription.findMany({
        where:{
            userId:session?.user.id
        }
    })
    return data
}