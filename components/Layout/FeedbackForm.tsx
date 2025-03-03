"use client"

import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormValue {
    details:string
}

export default function FeedbackForm() {

    const {register, handleSubmit} = useForm<IFormValue>()

    const feedBackHandler = async(data:IFormValue)=>{
        const id = toast.loading('Adding feedback')
        try {
            const addFeedBack = await axios.post("/api/feedback", data)
            console.log(addFeedBack.data.success)
            if(addFeedBack.data.success){
                toast.success(addFeedBack.data.message || "Feedback Added",{
                    id:id
                })
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.message || error.message,{
                    id:id
                })
            }else{
                const err = (error as Error).message
                toast.error(err|| "Something went wrong",{
                    id:id
                })
            }

        }


    }

  return (
    <form className="border-2 px-4 py-2  rounded-md w-72 flex flex-col bg-white" onSubmit={handleSubmit(feedBackHandler)} >
      <textarea
      {...register("details")}
        className="w-full flex min-h-[60px]  max-sm:min-h-[75px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-[90px] resize-none"
        placeholder="Share your feedback here"
      ></textarea>
      <button type="submit" className="ml-auto w-full border-2 border-black mt-2 px-1 py-1 text-sm rounded-sm bg-black text-white">Send</button>
    </form>
  );
}
