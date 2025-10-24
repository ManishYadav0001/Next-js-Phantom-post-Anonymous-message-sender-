"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function page() {

    const [userData, setUserData] = useState()
    const router = useRouter();


    useEffect(() => {

        async function checkAuth() {
            const res = await axios.get("/api/checkAuth")
            console.log(res.data.data)
            if (!res.data.success) {
                router.push("/login")
            }
            setUserData(res.data.data)

            console.log(userData)

        }

        checkAuth();

    }, [])

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />

        </main>
    )
}
