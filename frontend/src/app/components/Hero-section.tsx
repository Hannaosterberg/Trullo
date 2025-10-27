"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSection() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const handleSignUp = () => {
        router.push(`/register?email=${encodeURIComponent(email)}`);
    };

    return (
        <section>
            <div className="flex gap-6 justify-center items-center">
            <div className="flex flex-col gap-6 justify-between items-center">
            <h1 className="text-4xl font-bold">Capture, organize, and <br/>tackle your to-dos from anywhere.</h1>
            <p className="text-xl">Escape the clutter and chaos—unleash your productivity with Trullo.</p>
            </div>
            <Image src="/tasks.jpg" alt="photo of postit notes" 
                    width={400} 
                    height={400}
                    loading="eager"
                    className="opacity-90 rounded-xs hidden md:flex"/>
            </div>
            <div className=" flex mt-4 gap-2">
                <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-sm ml-4"
                />
                <button 
                    onClick={handleSignUp}
                    className="border border-gray-300 px-4 py-2 rounded-sm hover:font-bold"><Link href="/register">Sign up - it´s free</Link></button>
            </div>
        </section>
    )
}