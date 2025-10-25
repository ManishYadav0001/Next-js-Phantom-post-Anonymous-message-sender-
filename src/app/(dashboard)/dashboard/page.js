"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import DashboardNavbar from "@/components/DashboardNavbar";

export default function Page() {
    const [profileUrl, setProfileUrl] = useState("");
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const router = useRouter();

    // Fetch user authentication
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await axios.get("/api/checkAuth");
                if (!res.data.success) {
                    router.push("/login");
                    return;
                }
                setUserData(res.data.data);
            } catch (error) {
                console.log(error);
                router.push("/login");
            }
        }
        fetchUser();
    }, [router]);

    // Set profile link once userData is available
    useEffect(() => {
        if (userData?.name && typeof window !== "undefined") {
            const url = `${window.location.protocol}//${window.location.host}`;
            setProfileUrl(`${url}/send-message/${userData.name}`);
        }
    }, [userData]);

    // Fetch messages after userData is ready
    useEffect(() => {


        if (!userData?.id) return;

        async function getMessages() {
            setLoadingMessages(true);
            try {
                console.log("Sending userId to API:", userData.id);
                const res = await axios.post("/api/get-messages", { userId: userData.id });
                if (!res.data.success) {
                    toast.error(res.data.message);
                    setMessages([]);
                } else {
                    setMessages(res.data.messages || []);
                }
            } catch (error) {
                console.log("Error fetching messages:", error);
                toast.error("Failed to fetch messages");
            } finally {
                setLoadingMessages(false);
            }
        }

        getMessages();
    }, [userData]);

    // Copy profile link to clipboard
    const handleCopy = () => {
        if (profileUrl) {
            navigator.clipboard.writeText(profileUrl);
            toast.message("URL copied to clipboard");
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <DashboardNavbar />

            <section className="flex flex-col items-center px-6 py-12 w-full">
                {/* Greeting */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold mb-2">
                        Welcome back, {userData?.name} 👋
                    </h1>
                    <p className="text-gray-400">Here’s All the anonymous messages you got</p>
                </div>

                {/* Profile Link Input + Copy */}
                <div className="w-full max-w-xl mb-12 flex items-center relative">
                    <input
                        type="text"
                        value={profileUrl}
                        readOnly
                        placeholder="Loading your message link..."
                        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 placeholder-white focus:outline-none focus:border-white transition"
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                    >
                        <Copy className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Messages Section */}
                <div className="w-full max-w-4xl">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Your Messages ({messages.length})
                    </h2>

                    {loadingMessages ? (
                        <div className="text-center py-12 text-gray-400">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
                                <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
                                <p className="text-gray-400 mb-4">
                                    Share your link to start receiving anonymous messages!
                                </p>
                                <p className="text-sm text-gray-500">
                                    Copy the link above and share it with your friends.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {messages.map((message, index) => (
                                <div
                                    key={message._id || index}
                                    className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:bg-gray-750 transition"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-white">
                                            Message #{index + 1}
                                        </h3>
                                        <span className="text-xs text-gray-400">
                                            {new Date(message.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                        {message.content}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            {new Date(message.createdAt).toLocaleTimeString()}
                                        </span>
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}