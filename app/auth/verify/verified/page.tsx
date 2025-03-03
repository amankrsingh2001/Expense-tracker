"use client";

import { useEffect, useState } from "react";

export default function Verified() {
    const [time, setTime] = useState<number>(3);

    useEffect(() => {
        const redirectTime = new Date().toLocaleTimeString()
        const redirectSeconds = parseInt(redirectTime.split(":")[2].split(" ")[0])+3

        const timer = setInterval(() => {
            const time = new Date().toLocaleTimeString(); 
            const seconds = time.split(":")[2].split(" ")[0];
            const updateTime = redirectSeconds - parseInt(seconds)
            if(updateTime <= 0){
                window.location.href = "/auth/signin"
            }
            setTime(updateTime);
        }, 1000);


        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-8 rounded-xl shadow-xl border-2 text-center">
                <h2 className="text-2xl font-bold  mb-4">Verification Successful!</h2>
                <p className="mb-6 font-serif">Your account has been verified successfully.</p>
                <p className="font-serif">You will be redirect to Signin <br/> ...{time} seconds</p>
            </div>
        </div>
    );
}
