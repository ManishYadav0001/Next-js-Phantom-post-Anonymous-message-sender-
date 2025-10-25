"use client";

import { MessageSchema } from "@/Schemas/MessagesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const [isUserExist, setIsUserExist] = useState(null); // null = loading state

  const params = useParams();
  const { username } = params;

  useEffect(() => {
    async function checkUserExistOrNot() {
      try {
        const res = await axios.post("/api/checkUserExistOrNot", { username });

        if (res.data.success) {
          setIsUserExist(true);
        } else {
          setIsUserExist(false);
        }
      } catch (error) {
        console.log("check user error", error);
        setIsUserExist(false);
      }
    }
    checkUserExistOrNot();
  }, [username]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(MessageSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { content } = data;
      const res = await axios.post("/api/send-message", { content, username });

      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message);
    } catch (error) {
      toast.error("Something went wrong");
      console.log("sending message error", error);
    }
  };

  // ✅ Add return here
  if (isUserExist === null) {
    // Loading state
    return (
      <main className="flex items-center justify-center min-h-screen bg-black text-gray-300">
        <p className="text-lg animate-pulse">Checking user...</p>
      </main>
    );
  }

  if (!isUserExist) {
    // User not found
    return (
      <main className="min-h-screen flex flex-col items-center justify-center  from-gray-950 to-gray-900 text-white px-6 text-center">
        {/* Error Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0 3.75h.008v.008H12V16.5zm9.372 4.128A10.5 10.5 0 1 1 2.628 4.372a10.5 10.5 0 0 1 18.744 16.256z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-3 tracking-wide">User Not Found</h1>
        <p className="text-gray-400 max-w-md mb-8">
          Sorry, we couldn’t find the user you’re looking for. They might have
          changed their username or deleted their account.
        </p>

        <a
          href="/"
          className="inline-block px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition"
        >
          Go Back Home
        </a>

        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[500px] h-[500px] bg-red-500/10 blur-3xl rounded-full" />
        </div>
      </main>
    );
  }

  // User exists → show send message UI
  return (
    <main className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/subtle-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* Message Card */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 p-10 rounded-2xl w-[90%] max-w-md text-center shadow-xl">
        <h1 className="text-3xl font-semibold mb-2 tracking-wide">
          Send a Message to {username}
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Anyone can send a message — keep it short and respectful.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Message</label>
            <textarea
              {...register("content")}
              rows="6"
              placeholder="Write your message here..."
              className="w-full p-3 rounded-lg bg-transparent border border-white/30 placeholder-gray-500 focus:outline-none focus:border-white transition resize-none"
              required
            ></textarea>
            {errors.content && (
              <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 p-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}