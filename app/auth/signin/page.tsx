"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff, IndianRupee } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {useState} from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { loginUser } from "@/common/types";
import toast from "react-hot-toast";

import {  signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SecondSide from "@/components/SecondSide";



interface IFormValue {
  email:string,
  password:string
}

export default function Login(){
    const [showPassword, setShowPassword] = useState(false)
    const {register, handleSubmit} = useForm<IFormValue>()
    const router = useRouter()

    const signinHandler = async(data:IFormValue)=>{
        const id = toast.loading('...loading')
        const parseData = loginUser.safeParse(data)
        if(!parseData.success){
            toast.error("Enter Valid data",{
                id:id
            })
            return;
        }

        try {

            const result = await signIn("credentials", {
              redirect: false,
              email:parseData.data.email,
              password:parseData.data.password
            });

            if(result?.ok){
              toast.success("Logged in Successfully",{
                id:id
              })
            
            }
            router.push('/dashboard/all')
            
      } catch (error) {
          const err = (error as Error).message
          toast.error(err, {
            id:id
          })
      }
    }


    return <div className="h-screen w-screen">
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
          <form className="" onSubmit={handleSubmit(signinHandler)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            

       

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
            Don't have an Account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

      

          </form>
          
        </div>

        {/* second Section */}
        <SecondSide/>
      </div>
    </div>
  </div>
}