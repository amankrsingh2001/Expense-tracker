import { mailSender } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
    const data = await req.json()
   
    try {
            const prevOtp = await prisma.otp.findFirst({
                where:{
                    email:data.email
                },
                select:{
                    otp:true,
                    id:true,
                    expireAt:true
                }
            })

            if(!prevOtp || !prevOtp.id){
                throw new Error("Falied to Resend Otp")
            }

            const currentTime = new Date(Date.now())
            
            if (currentTime > prevOtp.expireAt){
                const resendNewOtp = await axios.post(process.env.APP_URL || "http://localhost:3000/api/verify", data.email)
                return NextResponse.json({
                    data:resendNewOtp.data
                })
            }
            const resendOtp = mailSender(data.email, prevOtp.otp)
            return NextResponse.json({
                success:true,
                message:"Opt send successfully"
            },{
                status:200
            })
    } catch (error) {
        const err = (error as Error).message
        return NextResponse.json({
            success:false,
            message:err || "Something went wrong"
        },{
            status:500
        })
    }
}