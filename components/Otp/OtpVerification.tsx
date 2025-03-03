"use client"

import { useEffect, useState } from "react"
import OtpInput from "./OtpInput"
import { getSession } from "next-auth/react"
import { RefreshCw } from "lucide-react"
import axios from "axios"
import { dcrypt } from "@/lib/Encrypt"




export default function OtpVerification(){
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [userEmail, setUserEmail] = useState('*****@gmail.com')

  useEffect(()=>{
    const userdata = localStorage.getItem("userData")
    const userEmail = dcrypt(userdata)
    setUserEmail(userEmail.email)

  },[])
 

  const handleComplete = async(otp:string)=>{
    setIsVerifying(true)
    setError(null)
try {
      const userData = localStorage.getItem("userData")
      const dcryptedData = dcrypt(userData)
      const finalData = {...dcryptedData, otp:otp}
      const createUser = await axios.post('/api/signup', finalData)
      if(!createUser.data.success){
        throw new Error(createUser.data.message)
      }
      setIsVerifying(false)
      setSuccess(true)
      localStorage.removeItem("userData")
      window.location.href = "/auth/verify/verified"
} catch (error) {
  if(axios.isAxiosError(error)){
    setError(error.response?.data.message|| error.message)
  }else{
    const err = (error as Error).message
    setError(err)
  }
  setIsVerifying(false)
  return;
}}

  const handleResend = () => {
    setError(null);
    setSuccess(false);
    onResend();
    
    setResetKey(prev => prev + 1);
  };
  

  const onResend = () =>{

  }

  
  return <div className="w-full  mx-auto p-6 bg-white rounded-xl shadow-md">
     <h2 className="text-2xl font-bold text-center text-black mb-6">Verification Code</h2>
      <p className="text-center text-gray-600 mb-8">
        We've sent a verification code to<br />
        <span className="font-medium text-black">{userEmail}</span>
        </p>
          <OtpInput key={resetKey} onComplete={handleComplete} length={6}/>

          {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm text-center">
          Verification successful!
        </div>
      )}

          {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
          {error}
        
        </div>
      )}

        <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm mb-2">Didn't receive the code?</p>
        <button
          onClick={handleResend}
          disabled={isVerifying}
          className="inline-flex items-center text-black font-medium hover:text-gray-700 transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          Resend Code
        </button>
      </div>
          {isVerifying && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Verifying...
        </div>
      )}
    </div>
}