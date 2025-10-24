"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/Schemas/SignupSchema";
import axios from "axios";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceCallback } from 'usehooks-ts'
import { Loader2 } from "lucide-react";

export default function SignupPage() {

    useEffect(() => {

        async function checkAuth() {
            const res = await axios.get("/api/checkAuth")
           
            if (res.data.success) {
                router.push("/dashboard")
            }
            

        }

        checkAuth();

    }, [])

    const [name, setName] = useState('')
    const [checkingUsername, setCheckingUsername] = useState(false)
    const [errorforUsername, setErrorforUsername] = useState("")

    const [isUsernameUnique, setIsUsernameUnique] = useState()


    const debounced = useDebounceCallback(setName, 500)
    useEffect(() => {

        async function checkUniqueUsername() {
            try {
                setCheckingUsername(true)

                const res = await axios.post("/api/checkUsernameUnique", { name })


                if (!res.data.success) {
                    setErrorforUsername("Username is not unique")
                    setIsUsernameUnique(false)
                }
            } catch (error) {
                console.log("unique username check error", error)
            }
            finally {
                setCheckingUsername(false)
            }
        }

        if (name.length > 0) {

            checkUniqueUsername();
        }

    }, [name])

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: zodResolver(SignupSchema)
        }
    )


    const onSubmit = async (data) => {

        const { name, password, email } = data;

        try {




            const res = await axios.post("/api/signup", { name, email, password })

            console.log(res)

            if (!res.data.success) {
                toast.error(res.data.message)

                return;
            }

            router.push(`/user-verification/${res.data.userData.name}`)






        } catch (error) {
            console.log("signup error", error)
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
                    Create Your Account
                </h1>
                <p className="text-gray-400 text-sm mb-8">
                    Join PhantomPost and start sending anonymous messages
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Username</label>
                        <input
                            {...register("name")}
                            onChange={(e) => { debounced(e.target.value) }}
                            type="text"
                            placeholder="Your name"
                            className="w-full p-3 rounded-lg bg-transparent border border-white/30 placeholder-gray-500 focus:outline-none focus:border-white transition"
                            required
                        />
                        {
                            checkingUsername ? <Loader2 className="animate-spin h-2.5" /> : ""
                        }
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                        )}
                        {name.length > 0 && !checkingUsername && (
                            errorforUsername ? (
                                <p className="text-red-400 text-sm mt-1">{errorforUsername}</p>
                            ) : (
                                <p className="text-green-400 text-sm mt-1">username is unique</p>
                            )
                        )}

                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full p-3 rounded-lg bg-transparent border border-white/30 placeholder-gray-500 focus:outline-none focus:border-white transition"
                            required
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 rounded-lg bg-transparent border border-white/30 placeholder-gray-500 focus:outline-none focus:border-white transition"
                            required
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
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
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-white underline underline-offset-4 hover:text-gray-300"
                    >
                        Login
                    </Link>
                </p>
            </div >
        </main >
    );
}