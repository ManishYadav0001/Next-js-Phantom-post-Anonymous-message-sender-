import { NextResponse } from 'next/server';

export async function POST() {
    try {
        
        const response = NextResponse.json({ success: true, message: 'auth-token cookie deleted' });

        response.cookies.set({
            name: 'auth-token',
            value: '',
            path: '/',
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return response;

    } catch (error) {

        console.log("LOGOUT ERROR", error)
        return NextResponse.json({
            success: false,
            message: "LOGOUT ERROR"

        })
    }
}
