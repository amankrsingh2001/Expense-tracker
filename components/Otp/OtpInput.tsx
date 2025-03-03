"use client"

import { useEffect, useRef, useState } from "react"


interface OtpData{
    length:number
    onComplete:(otp:string)=>void
}


export default function OtpInput({length, onComplete}:OtpData){

 const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
 const inputRef = useRef<(HTMLInputElement|null)[]>([])

 useEffect(() => {
    inputRef.current = inputRef.current.slice(0, length);
  }, [length]);

 useEffect(()=>{
    inputRef.current[0]?.focus()
 },[])

 const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>, index:number)=>{
    e.preventDefault()
    const value = e.target.value
    
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp]
    newOtp[index] = value;
    setOtp(newOtp)

    if (newOtp.every(digit => digit !== '') && newOtp.length === length) {
        onComplete(newOtp.join(''));
      }

    if(value && index<length-1 && inputRef.current[index+1]){
        inputRef.current[index+1]?.focus()
    }

 }
 const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>, index:number)=>{
    if(e.key == "Backspace"){
        if(otp[index] === '' && index>0 && inputRef.current[index-1]){
            inputRef.current[index-1]?.focus()
        }
    }

    if(e.key == "ArrowLeft" && index>0 && inputRef.current[index-1]){
        inputRef.current[index-1]?.focus()
    }

    if(e.key == "ArrowRight" && index<length-1 && inputRef.current[index+1]){
        inputRef.current[index+1]?.focus()
    }
 }



    return <div className="space-x-3 px-2 py-4 rounded-md">
      { 
        otp.map((digit, index)=>{
          return <input 
          key={index}
          ref={el=>{inputRef.current[index]=el}}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white text-black"
          onChange={(e)=>onChangeHandler(e, index)}
          onKeyDown={(e)=>handleKeyDown(e, index)}
        //   onPaste={handlePaste}
           />
        })
      }
    </div>
}