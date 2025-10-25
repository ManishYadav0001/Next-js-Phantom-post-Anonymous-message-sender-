import { connectDB } from "@/db/DBconnect";
import { Message } from "@/Models/Message.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function POST(request) {
    await connectDB();

    try {

        const { userId } = await request.json();




        const allMessages = await Message.find({ owner: userId });




        return NextResponse.json({
            success: true,
            message: "all messages found",
            messages: allMessages
        })

    } catch (error) {

        console.log("getting message api error", error)

        return NextResponse.json({
            success: false,
            message: "getting message api error"
        })

    }
}