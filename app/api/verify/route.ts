import { mailSender } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from "otp-generator";



export const POST = async (req: NextRequest) => {
  const data = await req.json();
  try {
    const newUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (newUser && newUser.id) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exist",
        },
        {
          status: 404,
        }
      );
    }

    const deletePreviousOtp = await prisma.otp.deleteMany({
      where: {
        email: data.email,
      },
    });

    if (deletePreviousOtp == null) {
      throw new Error("Something went wrong");
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const sendOtp = await prisma.otp.create({
      data: {
        email: data.email,
        otp: otp,
        expireAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    if (!sendOtp.id) {
      return NextResponse.json({
        success: false,
        message: "Falied to create Otp",
      });
    }
    const sendMail = await mailSender(data.email, otp);


    if (!sendMail) {
      throw new Error("Error while sending Otp");
    }
    
    return NextResponse.json(
      {
        success: true,
        message: "Otp sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error)
    const err = (error as Error).message;
    return NextResponse.json(
      {
        success: false,
        message: err || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
};
