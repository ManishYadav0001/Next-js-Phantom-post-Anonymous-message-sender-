import Link from "next/link";


export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-5 backdrop-blur-sm ">

            <h1 className="text-2xl font-semibold tracking-wide">
                Phantom<span className="text-gray-400">Post</span>
            </h1>


            <div className="flex items-center gap-6 text-sm font-light">
                <Link href="/login" className="hover:text-gray-400 transition-colors">
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all"
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}