import { registerUser } from "@/common/types";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt"

export const  POST= async(req:NextRequest)=>{
    const data = await req.json()
    
    const parseData = registerUser.safeParse(data)
    console.log(parseData)
    if(!parseData.success){
        return NextResponse.json({
            success:false,
            message:"Invalid Data"
        },{status:411})
    }
    try {
        const user = await prisma.user.findFirst({
            where:{
                email:parseData.data.email
            }
        })
        console.log(user,"*********")
        if(user !== null ){
            return NextResponse.json({
                success:false,
                message:"User already exist"
            },{
                status:411
            })
        }
        const saltRound = 10;
        const hashPassword = bcrypt.hashSync(parseData.data.password, saltRound)

        const createNewUser = await prisma.user.create({
            data:{
                email:parseData.data.email,
                password:hashPassword,
                firstName:parseData.data.firstName,
                lastName:parseData.data.lastName
            }
        })
        if(!createNewUser.id){
            throw new Error("Failed to create User")
        }
        return NextResponse.json({
            success:true,
            message:"Account created Successfully"
        },{
            status:200
        })
    } catch (error) {
        const err = (error as Error).message 
        return NextResponse.json({
            success:false,
            message:err
        },{
            status:500
        })
    }
}   