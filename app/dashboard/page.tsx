"use client"

import { signOut } from "next-auth/react";

export default function Dashboard(){
    return (<div>
     
        <button onClick={()=>signOut({callbackUrl: 'http://localhost:3000/auth/signin'})}>Click to logout</button>
    </div>)
}