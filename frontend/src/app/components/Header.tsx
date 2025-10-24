"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.7);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])
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
                    <li className="hover:font-bold"><a href="/login">Login</a></li>
                    <li className="hover:font-bold text-white">
                        <button className="border border-gray-300 px-4 py-2 rounded-xs">
                            <a href="/register">Get Trullo for free</a>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}