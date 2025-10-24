import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json({ success: true, message: 'allow_Verification cookie deleted' });

        response.cookies.set({
            name: 'allow_verification',
            value: '',
            path: '/',
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return response;
    } catch (error) {
        console.log("EXPIRE VERIFICATION ERROR", error)

        return NextResponse.json({
            success: false,
            message: "EXPIRE VERIFICATION ERROR"
        })
    }
}
