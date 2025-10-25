import { connectDB } from "@/db/DBconnect"
import { Message } from "@/Models/Message.model";
import { User } from "@/Models/User.model";
import { MessageSchema } from "@/Schemas/MessagesSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
       await connectDB();

        const { username, content } = await request.json();

        const { success, data, error } = MessageSchema.safeParse({content});

        if (!success) {

            return NextResponse.json({
                success: false,
                message: "Validation error "
            })
        }

        const user = await User.findOne({ name:username })

        if (!user) {

            return NextResponse.json({
                success: false,
                message: "User not exist "
            })
        }

        const newMessage = await Message.create({
            content,
            createdAt: new Date,
            owner: user._id
        });

        if (!newMessage) {
            return NextResponse.json({
                success: false,
                message: "can't send message now"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Message sent successfully"
        })

    } catch (error) {

        console.log("Send-Message api error", error)

        return NextResponse.json({
            success: false,
            message: "Send-Message api error"
        })
    }
}