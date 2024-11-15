/* eslint-disable @next/next/no-html-link-for-pages */

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { useCartStore } from "@/store";

function Navbar() {
    // const userStore = useCartStore();

    return (
        <>
            <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
                <Link href="/" className="uppercase font-bold text-md h-12 flex items-center">
                    Next Store
                </Link>
                <div className="flex items-center gap-8">
                    <div className="flex items-center cursor-pointer relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 4.5h16.5l-1.5 9H5.25l-1.5-9zM7.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm12 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                            />
                        </svg>
                        <span className="bg-teal-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-3 bottom-3">
                            2
                        </span>
                    </div>
                    <div>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton>
                                <button className="border rounded-md border-gray-400 px-3 py-2">
                                    Fazer Login
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
