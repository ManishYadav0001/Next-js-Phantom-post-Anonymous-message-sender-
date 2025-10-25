import { connectDB } from "@/db/DBconnect";
import { User } from "@/Models/User.model";
import { NextResponse } from "next/server";


export async function POST(request) {
    await connectDB();

    try {
        const { username } = await request.json();

        const user = await User.findOne({ name: username });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "user not exist"
            })
        }

        return NextResponse.json({
            success: true,
            message: "user exists"
        })


    } catch (error) {
        console.log("checking user existance error", error)

        return NextResponse.json({
            success: false,
            message: "checking user existance error"
        })
    }
}