import { connectDB } from "@/db/DBconnect";
import { User } from "@/Models/User.model";
import { NextResponse } from "next/server";

export async function POST(request) {

    await connectDB();


    try {

        const { name } = await request.json()

        const user = await User.findOne({ name })

        if (user) {
            return NextResponse.json({
                success: false,
                message: "username already taken. please choose unique username"
            })
        }

        return NextResponse.json({
            success: true,
            message: "username is unique"
        })
    } catch (error) {

        console.log("CHECK-UNIQUE-USERNAME ROUTE ERROR ", error)
        return NextResponse.json({
            success: false,
            message: "CHECKING UNIQUE USERNAME   ERROR INCOMING"
        })
    }
}