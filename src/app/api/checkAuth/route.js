import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"



export async function GET(request) {

    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "unAuthorized request"
            })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (!payload) {
            return NextResponse.json({
                success: false,
                message: "unAuthorized token"
            })
        }


        return NextResponse.json({
            success: true,
            message: "authorization successful",
            data: payload
        })

    } catch (error) {

        console.log("checkauth error", error)
        return NextResponse.json({
            success: false,
            message: "checkAuth error"
        })
    }


}