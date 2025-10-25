"use client"

import axios from "axios";
import { readOrCreateRouteCacheEntry } from "next/dist/client/components/segment-cache-impl/cache";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {


    const router = useRouter()

    const handleLogOut = async () => {

        try {

            const res = await axios.post("/api/logout")

            if (res.data.success) {
              router.push("/login")

            }

        } catch (error) {
            console.log("log-out error", error)
        }

    }



    return (
        <nav className="flex items-center justify-between px-8 py-5 backdrop-blur-sm ">

            <h1 className="text-2xl font-semibold tracking-wide">
                <a href="/">
                Phantom<span className="text-gray-400">Post</span></a>
            </h1>


            <div className="flex items-center gap-6 text-sm font-light">
                <div className="px-4 py-2 border font-semibold cursor-pointer border-white/30 rounded-full hover:bg-white hover:text-black transition-all" >
                    <button onClick={handleLogOut}>LogOut</button>
                </div>
            </div>
        </nav>
    );
}