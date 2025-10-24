import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"



export async function GET(request) {

    try {
        const token = request.cookies.get('allow_verification')?.value;

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "signup first"
            })
        }



        return NextResponse.json({
            success: true,
            message: "verify your account"
            
        })

    } catch (error) {

        console.log("protectVerifyRoute error", error)
        return NextResponse.json({
            success: false,
            message: "protectVerifyRoute error"
        })
    }


}