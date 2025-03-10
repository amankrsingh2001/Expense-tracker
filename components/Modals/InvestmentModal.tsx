"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
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
  setInvestValue:any
}
export default function InvestmentModal({title,modal,setModal,api, setInvestValue}: ModalData) {

  const {register, handleSubmit, setValue}  = useForm()

  const formHandler = async(data:any)=>{

    const id = toast.loading('...Adding')
    
    try {
      const addData = await axios.post(api, data)

      // edit tiast
      toast.success('Added',{
        id:id
      })

      addData.data.investment.createdAt = new Date(addData.data.investment.createdAt)

      setInvestValue((prev:any)=>[...prev, addData.data.investment])
      setModal(!modal)
    } catch (error) { 

      if(axios.isAxiosError(error)){
        toast.error("axios Erros",{
          id:id
        })
      }else{
        const err = (error as Error).message
        toast.error(err,{
          id:id
        })
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
          >
            <CloseIcon />
          </button>
          <h3 className="capitalize text-xl font-semibold tracking-wider ">
            {title }
          </h3>
          <div className="flex flex-col gap-3">
            <Label htmlFor="name" className="text-md">Name</Label>
            <Input {...register("name")} name="name" id="name" className="outline-4 border-2" placeholder="APPLE - $1" />
          </div>
 
            <div className="flex flex-col gap-4">
              <div className="flex  justify-between w-full">
                <div className="w-[48%]">
                  <Label htmlFor="stockPrice" className="text-md">Single Stock Price</Label>
                  <Input
                  {...register("stockPrice")}
                  name="stockPrice"
                  id="stockPrice"
                    className="border-2"
                    placeholder="199"
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/\D/g, "");
                    }}
                  />
                </div>

                <div className="w-[48%]">
                  <Label htmlFor="units" className="text-md">Units</Label>
                  <Input
                    {...register("units")}
                    name="units"
                    id="units"
                    className="border-2"
                    placeholder="199"
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/\D/g, "");
                    }}
                  />
                </div>
              </div>
              <div className="flex  justify-between w-full">
                <div className="w-[48%]">
                  <Label htmlFor="boughtDate" className="text-md">Bought Date</Label>
                  <Input
                    {...register("boughtDate")}
                    id="boughtDate"
                    name="boughtDate"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="w-[48%] ">
                  <Label htmlFor="category" className="text-md">Category</Label>
                  <Select onValueChange={(value)=>setValue("category", value)}>
                    <SelectTrigger className="w-full border-2">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Crypto Currency">Crypto Currency</SelectItem>
                      <SelectItem value="Indian Stock">Indian Stock</SelectItem>
                      <SelectItem value="Mutual Funds">Mutual Funds</SelectItem>
                      <SelectItem value="Others">Other</SelectItem>
                      <SelectItem value="US Stock">US Stock</SelectItem>
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
