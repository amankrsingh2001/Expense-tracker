
"use client"
import CTA from "@/components/LandingPage/Cta";
import Features from "@/components/LandingPage/Features";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPage/Navbar";
import Pricing from "@/components/LandingPage/Pricing";


import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast";

export default function Home() {

      const router = useRouter()
      
      const checkAuth = async()=>{
          const session = await getSession()
          return session?.expires
      }

      
      useEffect(()=>{
          const getExpires = async ()=>{
            const id = toast.loading('...Checking session',{
             position:"top-right"
            })
              const expires = await checkAuth()
              const currentTime = new Date(Date.now()).toISOString()

              if(expires == null) {
                toast.error("Session Timeout, Please Login Again",{
                  id:id,
                  position:"top-right",
                  style: {
                    background: "#eb1e0c", 
                    color: "#fff", 
                    fontWeight: "medium",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  },
                  iconTheme:{
                    primary:"#fff",
                    secondary:'#f06559'
                  }
              })
                 return;
              }
              if(expires>currentTime){
                toast.success("Session Active",{
                  id:id,
                  style: {
                    background: "#4CAF50", 
                    color: "#fff", 
                    fontWeight: "bold",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  },
                  position:"top-right"
                })
                  router.push("/dashboard")
              }
              toast.dismiss()
              }
          getExpires() 
      },[])


  return (
    <div suppressHydrationWarning>
  
      <Navbar />
      <div className="absolute inset-x-0 top-[20px] z-10 h-96 overflow-hidden text-gray-900/40 opacity-20 [mask-image:linear-gradient(to_top,transparent,white)]">
        <svg
          className="absolute inset-0 top-0 h-full w-full text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dotted-pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="100%"
            >
              <circle cx="4" cy="4" r="1.5" fill="currentColor" />
              <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              <circle cx="28" cy="28" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotted-pattern)"></rect>
        </svg>
      </div>
      {/* <CheckAuth/> */}
      <Hero />
      <Features/>
      <Pricing/>
      <CTA/>
      <Footer/>
    </div>
  );
}
