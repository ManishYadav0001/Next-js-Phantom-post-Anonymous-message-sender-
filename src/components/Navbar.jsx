"use client"

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Logoout from "./Logoout";

export default function Navbar() {

    const [isLogin, setIsLogin] = useState(false)

    const handleLogOut = async () => {

        try {

            const res = await axios.post("/api/logout")

            if (res.data.success) {
                setIsLogin(false)

            }

        } catch (error) {
            console.log("log-out error", error)
        }

    }

    useEffect(() => {

        async function checkAuth() {
            const res = await axios.get("/api/checkAuth")

            if (res.data.success) {
                setIsLogin(true)
            }


        }
        checkAuth();

    }, [])

    return (
        <nav className="flex items-center justify-between px-8 py-5 backdrop-blur-sm ">

            <h1 className="text-2xl font-semibold tracking-wide">
                Phantom<span className="text-gray-400">Post</span>
            </h1>


            <div className="flex items-center gap-6 text-sm font-light">
                {
                    isLogin ? (<div className="px-4 py-2 border font-semibold cursor-pointer border-white/30 rounded-full hover:bg-white hover:text-black transition-all" >
                        <button onClick={handleLogOut}>LogOut</button>
                    </div>) : (<div>  <Link href="/login" className="hover:text-gray-400 mr-2 transition-colors">
                        Login
                    </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all"
                        >
                            Sign Up
                        </Link></div>)
                }
            </div>
        </nav>
    );
}