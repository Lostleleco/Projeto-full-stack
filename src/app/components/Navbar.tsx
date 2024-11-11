/* eslint-disable @next/next/no-html-link-for-pages */
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

function Navbar() {
    return (
        <>
            <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
                <Link href="/" className="uppercase font-bold text-md h-12 flex items-center">
                    Next Store
                </Link>
                <div className="flex items-center gap-8">
                    <SignInButton>
                        <button className="text-white bg-teal-600 px-4 py-2 rounded-md">
                            Fazer Login
                        </button>
                    </SignInButton>
                    <SignOutButton>
                        <button className="text-white bg-red-600 px-4 py-2 rounded-md">
                            Sair
                        </button>
                    </SignOutButton>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
