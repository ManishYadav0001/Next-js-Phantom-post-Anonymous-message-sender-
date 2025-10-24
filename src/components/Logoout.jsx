import axios from 'axios'
import React from 'react'

export default function Logoout() {

    const handleLogOut = async () => {

        try {

            const res = await axios.post("/api/logout")

            if(res.data.success){
                
            }

        } catch (error) {
            console.log("log-out error", error)
        }

    }

    return (
        <div className="px-4 py-2 border font-semibold cursor-pointer border-white/30 rounded-full hover:bg-white hover:text-black transition-all" >
            <button>LogOut</button>
        </div>
    )
}
