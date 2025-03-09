"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff, IndianRupee } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {useState, useEffect} from "react";
import { ModeToggle } from "@/components/theme-toggler";
import { Checkbox } from "@/components/ui/checkbox";
import { registerUser } from "@/common/types";
import toast from "react-hot-toast";
import axios from "axios"
import { useRouter } from "next/navigation";
import SecondSide from "@/components/SecondSide";
import { encrypt } from "@/lib/Encrypt";



interface IFormValue {
  firstName:string,
  lastName:string,
  email:string,
  password:string
}

export default function SignupPage() {
  
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const {register, handleSubmit} = useForm<IFormValue>()
 
  const registerHandler = async(data:IFormValue)=>{
    const id = toast.loading('...sending Otp')
    const parseData = registerUser.safeParse(data)
    if(!parseData.success){
      toast.error("Please enter valid credentials",{
        id:id
      })
      return;
    }
    try {
      const encryptedData = encrypt(data)
      localStorage.setItem("userData", encryptedData)

      const createUser = await axios.post('/api/verify', {email:data.email})


      if(!createUser.data.success){
        throw new Error(createUser.data.message)
      }
      toast.success(createUser.data.message, {
        id:id
      })
      router.push('/auth/verify')
    } catch (error) {
      console.log(error)
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message || error.message,{
          id:id
        })
      }
      const err = (error as Error).message
      toast.error(err,{
        id:id
      })
    }

  }

  return (
    <div className="h-screen w-screen">
      
      {/* navsection */}
      <div className="h-[10vh] sticky"></div>

      {/* main section */}

      <div className="w-full flex justify-center items-center">
        <div className="w-[80%]  flex justify-around border-2 border-gray-300 shadow-sm rounded-md  p-6">
          {/* first Section */}
          <div className="w-[35%]  ml-12 py-4">
            <div className="flex items-center gap-2 mb-6">
              <IndianRupee className="h-6 w-6 " />
              <h2 className="text-2xl font-bold">ExpenseTracker</h2>
            </div>
            <div className="space-y-3 mb-8">
              <h1 className="text-3xl font-bold ">Get Started Now</h1>
              <p className="text-gray-600">
                Enter your credentials to create your account
              </p>
            </div>
            <form className="" onSubmit={handleSubmit(registerHandler)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input
                  {...register("firstName")}
                    id="name"
                    placeholder="John"
                    className="h-10 border-2 text-base"
                  />
                </div>

                <div className="space-y-2 ">
                  <label htmlFor="name" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input
                  {...register("lastName")}
                    id="name"
                    placeholder="Doe"
                    className="h-10 border-2 text-base"
                  />
                </div>

              </div>
              <div className="space-y-2 mb-6">
                <label htmlFor="name" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="jhondoe@gmail.com"
                  className="h-10 border-2 text-base"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>

              <div className="relative">
                <Input
                                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 chars"
                  className="h-10 border-2 pr-10 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 my-6">
              <Checkbox id="terms" className="h-5 w-5" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Terms
                </Link>{" "}
                &{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>


              <Button type="submit" className="w-full mt-6 font-md text-md h-12">Sign Up</Button>
   
        <p className="text-center text-l text-gray-600 mt-6">
              Already have an account?{" "}
              <Link href="/api/auth/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>

        

            </form>
            
          </div>

          {/* second Section */}
            <SecondSide/>
        </div>
      </div>
    </div>
  );
}
