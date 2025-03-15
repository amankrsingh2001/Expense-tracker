"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CloseIcon from "../icons/CloseIcon";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import axios from "axios";

interface ModalData {
  title: string;
  modal: boolean;
  setModal: any;
  api:string
  setSubsValue?:any
  data?:any
  edit:boolean
}
export default function SubscriptionModal({title,modal,setModal, api, setSubsValue, data, edit}: ModalData) {

  const {register, handleSubmit, setValue, watch}  = useForm({
    defaultValues:data, 
  })
 


  const formHandler = async(data:any)=>{

    const id = toast.loading('...loading')
    if(edit){
      toast.loading("...Editing",{
        id:id
      })
      const editData = await axios.put('/api/subscription', data)
      toast.success('edited',{
        id:id
      })
      editData.data.data.createdAt = new Date(editData.data.data.createdAt)
      editData.data.data.renewal_date = new Date(editData.data.data.renewal_date)
      setSubsValue((prev: any) =>
        prev.map((it: any) =>
            it.id === editData.data.data.id ? { ...it, ...editData.data.data }  : it  // Keep other items unchanged
        )
    );
      setModal(false)
      

      return;
    }else{
      try {
      
      const addData = await axios.post(api, data)

      toast.success('Added',{
        id:id
      })
      addData.data.subscription.createdAt = new Date(addData.data.subscription.createdAt)
      addData.data.subscription.renewal_date = new Date(addData.data.subscription.renewal_date)
      setSubsValue((prev:any)=>[...prev, addData.data.subscription])
      setModal(!modal)
    } catch (error) { 
      if(axios.isAxiosError(error)){
        toast.error("axios Erros",{
          id:id
        })
      }else{
        const err = (error as Error).message
        toast.error(err || "Something went wrong",{
          id:id
        })
      }
    }  
    } 
  }
  
  return (
    <div
      onClick={() => {
        setModal(!modal);
      }}
      className="fixed  inset-0 z-[1000] place-items-center overflow-auto bg-[#e1e3e1] text-black bg-opacity-0 backdrop-blur-md"
      suppressHydrationWarning
    >
      <div className="w-full h-full flex justify-center items-center ">
        <form onSubmit={handleSubmit(formHandler)}
          className="border-2 flex flex-col w-[450px] gap-4 p-3 bg-white font-sans rounded-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setModal(!modal);
            }}
            className="absolute right-4 top-4"
            type="button"
          >
            <CloseIcon />
          </button>
          <h3 className="capitalize text-xl font-semibold tracking-wider ">
            {title }
          </h3>
          <div className="flex flex-col gap-3">
            <Label htmlFor="name" className="text-md">Name</Label>
            <Input {...register("name")} name="name" id="name" className="outline-4 border-2" placeholder="Website name" />
          </div>
    

            <div className="flex flex-col gap-4">
              <div className="w-full">
                <Label htmlFor="website"  className="text-md ">Website</Label>
                <Input
                {...register("url")}
                id="url"
                name="url"
                  className="border-2"
                  type="text"
                  placeholder="https://nextflix.com"
                />
              </div>

              <div className="flex gap-3">
                <div>
                  <Label htmlFor="price" className="text-md">Price</Label>
                  <Input
                  {...register("price")}
                  id="price"
                name="price"
                    className="border-2"
                    placeholder="10000"
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/\D/g, "");
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="boughtDate" className="text-md">Bought Date</Label>
                  <Input
                  {...register("boughtDate")}
                  name="boughtDate"
                  id="boughtDate"
                    className="border-2"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="relative"> {/* Remove z-index here */}
                  <Label htmlFor="paying" className="text-md">Paying</Label>
                  <Select 
                    onValueChange={(value) => setValue('paid', value)} 
                    value={watch('paid')}
                    onOpenChange={(open) => console.log("Dropdown is open:", open)}
                  >
                    <SelectTrigger className="w-[140px] border-2">
                      <SelectValue placeholder="Monthly" />
                    </SelectTrigger>
                    <SelectContent 
                      position="popper" className="z-[1001]"
                    >
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

          <div>
            <Label htmlFor="notes" className="text-md">Notes</Label>
            <textarea
            {...register("notes")}
            id="notes"
            name="notes"
              className="w-full flex min-h-[60px]  max-sm:min-h-[75px] rounded-md border
                        border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground
                        focus-visible:outline-none
                        focus-visible:ring-1 focus-visible:ring-ring
                        disabled:cursor-not-allowed disabled:opacity-50 h-[90px] resize-none"
              placeholder="Share your feedback here"
            ></textarea>
          </div>
          <button type="submit" className="bg-black text-white rounded-md py-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
