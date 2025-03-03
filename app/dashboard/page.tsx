"use client"

import { signOut } from "next-auth/react";

export default function Dashboard(){
    return (<div>
        This is the Dashboard page
        <button onClick={()=>signOut({callbackUrl: 'http://localhost:3000/auth/signin'})}>Click to logout</button>
    </div>)
}