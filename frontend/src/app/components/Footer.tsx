import Image from "next/image";
import Link from "next/link";

export function Footer() {

    return (
        <footer className="w-full bg-black/5 backdrop-blur-md py-8 px-6 mt-20 border-t border-zinc-800">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <Image 
                        src="/document.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        className="invert"/>
                    <Link href="#hero" className="text-xl text-white font-bold" >TRULLO</Link>
                </div>
                <div className="flex justify-center items-center gap-6 ">
                    <p className="hover:font-bold">About us</p>
                    <p className="hover:font-bold">Contact</p>
                    <p className="hover:font-bold">Privacy Policy</p>
                </div>
            </div>
                <p className="text-center text-gray-400 mt-4">© 2025 Trullo. All rights reserved.</p>
        </footer>
    )
}