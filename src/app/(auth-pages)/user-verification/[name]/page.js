"use client";

import { VerificationCodeSchema } from "@/Schemas/VerificationCodeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function verificationPage() {


    useEffect(() => {

        async function checkAuth() {
            const res = await axios.get("/api/protectVerifyRoute")
            if (!res.data.success) {
                router.push("/signup")
            }



        }

        checkAuth();

    }, [])


    const params = useParams();
    const router = useRouter();

    const { name } = params;

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: zodResolver(VerificationCodeSchema)
        }
    )

    const onSubmit = async (data) => {

        try {

            const verifyCode = data.verifyCode;

            const res = await axios.post("/api/verify-user", { verifyCode, name })

            if (!res.data.success) {
                toast.error(res.data.message)

                return;
            }



           await axios.post("/api/Expire-verification")

            

                router.push("/dashboard")

            




        } catch (error) {
            console.log("user-verification error", error)
        }
    }


    return (
        <main className="relative min-h-screen flex items-center justify-center  text-white overflow-hidden">
            {/* Background Layer */}
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/subtle-bg.jpg')",
                }}
            />
            <div className="absolute inset-0 bg-black/60 -z-10" />

            {/* Signup Card */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-10 rounded-2xl w-[90%] max-w-md text-center shadow-xl">
                <h1 className="text-3xl font-semibold mb-2 tracking-wide">
                    User Verification
                </h1>
                <p className="text-gray-400 text-sm mb-8">
                    please verify your account before moving forward
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">verification code</label>
                        <input
                            {...register("verifyCode")}
                            type="text"
                            placeholder="code"
                            className="w-full p-3 rounded-lg bg-transparent border border-white/30 placeholder-gray-500 focus:outline-none focus:border-white transition"
                            required
                        />
                        {errors.verifyCode && (
                            <p className="text-red-400 text-sm mt-1">{errors.verifyCode.message}</p>
                        )}

                    </div>



                    <button
                        type="submit"
                        className="mt-4 p-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
                    >
                        Sign Up
                    </button>

                </form>
                <p className="text-gray-400 text-sm mt-6">
                    Back to sign up{" "}
                    <Link
                        href="/signup"
                        className="text-white underline underline-offset-4 hover:text-gray-300"
                    >
                        Verify your Account
                    </Link>
                </p>
            </div>
        </main>
    );
}