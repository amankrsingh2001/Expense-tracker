"use client"

import axios from "axios"

export default function Handler(){
    const sendData = async()=>{
        const dataEnter = {
            name:"Youtube",
            notes:"First Income of the month",
            amount:"20000",
            category:"Passive"
        }
        const data = await axios.post('/api/income',dataEnter)

        console.log(data)
    }
    return <div>
        <button onClick={()=>sendData()}>Click to send data</button>
    </div>
}