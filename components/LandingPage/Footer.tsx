import { Instagram } from "lucide-react";
import TwitterIcon from "../icons/TwitterIcon";
import GitHubIcon from "../icons/GIthubIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import Link from "next/link";

export default function Footer(){
    return <div className="w-full  space-y-6">
        <div className="w-full flex flex-col justify-center items-center gap-4">
            <h1 className="text-5xl font-semibold tracking-wide bg-gradient-to-r from-[#2e2e2e] to-[#5B5B5B] bg-clip-text text-transparent">Open Sourced!</h1>
            <p className="text-xl font-sans font-light tracking-wide w-[25%] text-center">
                Source code is available on GitHub - feel free to read, review, or contribute to it!
            </p>
        </div>

        <div className="flex justify-center gap-4 p-6 border-t border-gray-400 ">
            <p className="text-center text-sm ">&#169; Copyright 2025, Expense-tracker</p>
            <Link href="https://x.com/AmanKumars2001">
                <TwitterIcon/>
            </Link>
            <Link href="https://github.com/amankrsingh2001/Expense-tracker">
                <GitHubIcon/>
            </Link>
            <Link href='https://www.linkedin.com/in/aman-kumar-singh-961027244/'>
                <LinkedInIcon/>
            </Link>
        </div>
        
    </div>
}