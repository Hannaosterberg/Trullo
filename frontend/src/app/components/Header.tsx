"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserStore } from "../lib/useUserStore";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const { name, logout, token } = useUserStore();
    const [ mounted, setMounted] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.7);
        };
        window.addEventListener("scroll", onScroll);
        setMounted(true)
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const isLoggedIn = mounted && Boolean(token);

    return (
        <header
            className={`py-4 px-6 shadow-sm shadow-zinc-800 sticky top-0 z-50 transition-colors duration-300 
            ${scrolled ? "bg-black/10 backdrop-blur-md" : "bg-transparent"}`}>
                <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                <Image 
                    src="/document.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="invert"/>
                <Link href="/" className="text-xl text-white font-bold" >TRULLO</Link>
                </div>
                <ul className="flex space-x-6 items-center">
                        {isLoggedIn ? (
                        <>
                            <li className="">Hello, {name ?? "User"}</li>
                            <li>
                                <button
                                    onClick={() => logout()}
                                    className="border border-gray-300 px-4 py-2 rounded-sm hover:font-bold">Logout</button>
                            </li>
                        </>
                        ) : (
                        <>
                            <li className="hover:font-bold"><a href="/login">Login</a></li>
                            <li className="hover:font-bold text-white">
                                <Link href="/register">
                                    <button className="border border-gray-300 px-4 py-2 rounded-sm">
                                        Get Trullo for free
                                    </button>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}