import { connectDB } from "@/db/DBconnect";
import { sendVerificationEmail } from "@/EmailVerification/EmailVerification";
import { User } from "@/Models/User.model";
import { SignupSchema } from "@/Schemas/SignupSchema";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(request) {
 await   connectDB();
    try {

        const { name, email, password } = await request.json();
        const { success, data, error } = SignupSchema.safeParse({
            name, email, password
        })

        if (!success) {
            return NextResponse.json({
                success: false,
                message: "zod validation error"
            })
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { name }]
        })

        if (existedUser) {
            return NextResponse.json({
                success: false,
                message: "user already existed"
            })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000);
        const currentTime = new Date();
        const newUser = User.create({
            name,
            email,
            password,
            verifyCode,
            verifyCodeExpiry: new Date(currentTime.getTime() + 60 * 60 * 1000),
            isVerified: false,
            isAcceptingMessage: true


        })


        if (!newUser) {
            return NextResponse.json({
                success: false,
                message: "user registration failed"
            })
        }

        const result = await sendVerificationEmail(email, name, verifyCode)

        if (!result.success) {

            await User.findByIdAndDelete(newUser?._id)
            return NextResponse.json({
                success: false,
                message: "verification code sending failed...."
            })
        }

        const response = NextResponse.json({
            success: true,
            message: "user registered successfully",
            userData: {
                name,
                email
            }
        })


        response.cookies.set({
            name: 'allow_verification',
            value: "true",
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
            path: '/',
        });


        return response;




    } catch (error) {

        console.log("SIGN-UP ROUTE ERROR ", error)
        return NextResponse.json({
            success: false,
            message: "SIGN-UP ERROR INCOMING"
        })
    }

}