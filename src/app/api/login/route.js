import { connectDB } from "@/db/DBconnect";
import { User } from "@/Models/User.model";
import { LoginSchema } from "@/Schemas/LogInSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
export async function POST(request) {

    await connectDB();

    try {

        const { email, password } = await request.json();

        const { success, data, error } = LoginSchema.safeParse({
            email, password
        })


        if (!success) {
            return NextResponse.json({
                success: false,
                message: "validation error"
            })
        }

        const isUserExisted = await User.findOne({ email })

        if (!isUserExisted) {
            return NextResponse.json({
                success: false,
                message: "user not found"
            })
        }

        const isPasswordCorrect = await isUserExisted.isPasswordCorrect(password)

        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: "invalid password"
            })
        }


        if(!isUserExisted.isVerified){
             return NextResponse.json({
                success: false,
                message: "user not verified"
            })
        }

        const payload = {
            id: isUserExisted._id,
            email: isUserExisted.email,
            name: isUserExisted.name,
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
        console.log("LOGIN ROUTE ERROR", error)
        return NextResponse.json({
            success: false,
            message: "login route error"
        })
    }
}