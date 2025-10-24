import { connectDB } from "@/db/DBconnect";
import { User } from "@/Models/User.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(request) {
    await connectDB();

    try {
        const { verifyCode, name } = await request.json();


        const user = await User.findOne({ name })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "user not found"
            })
        }

        const now = new Date();
        if (user.verifyCodeExpiry < now) {


            return NextResponse.json(
                {
                    success: false,
                    message: "OTP expired"
                }


            );

        }
        const isVerifyCodeCorrect = user.verifyCode.toString() === verifyCode.toString();

        if (!isVerifyCodeCorrect) {
            return NextResponse.json(
                { success: false, message: "invalid OTP , try again...." }

            );
        }

        user.isVerified = true;
        await user.save();

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
        };


        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });


        if (!token) {
            return NextResponse.json({
                success: false,
                message: "token generation error"
            })
        }



        const response = NextResponse.json({
            success: true,
            message: "user LoggedIn Successfully"
        })

        response.cookies.set({
            name: 'auth-token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600 * 24,
            path: '/',
        });


        return response;




    } catch (error) {
        console.log("VERIFICATION ERROR INCOMING", error)
        return NextResponse.json({
            success: false,
            message: "VERIFICATION ERROR INCOMING"
        })
    }
}