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
import { IncomeType } from "@/app/api/income/api";
import { ExpenseType } from "@/app/dashboard/expense/expenseApi";

interface ModalData {
  title: string;
  modal: boolean;
  setModal: any;
  api:string,
  setIncomeValue:any
  edit:boolean
  data?:IncomeType | null
}
export default function IncomeModal({title, modal, setModal, api, setIncomeValue, edit, data}: ModalData) {
  const {register, handleSubmit, setValue}  = useForm({
    defaultValues:  { 
      ...(data ?? {}), 
      recievedDate: data?.createdAt ?? new Date(Date.now())
    }
  })

  const formHandler = async(data:any)=>{
    const id = toast.loading('...Adding')
    if(edit){
      try {
        toast.loading('...Editing',{id:id})
        const editIncome = await axios.put(api, data)
        editIncome.data.updateIncome.createdAt = new Date(editIncome.data.updateIncome.createdAt)
        setIncomeValue((prev: any) =>
          prev.map((it: any) =>
              it.id === editIncome.data.updateIncome.id ? { ...it, ...editIncome.data.updateIncome }  : it                                // Keep other items unchanged
          )
      );

        setModal(false)
        toast.success("Edited Income",{
          id:id
        })
        
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
    }else{
      try {
      
        const addData = await axios.post(api, data)
       
        toast.success('Added',{
          id:id
        })    
        addData.data.newIncome.createdAt = new Date(addData.data.newIncome.createdAt)
  
        setModal(false)
        setIncomeValue((prev:any)=>[...prev, addData.data.newIncome])
      } catch (error) { 
        if(axios.isAxiosError(error)){
          toast.error("Netw Erros",{
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
            <Input {...register("name")} name="name" id="name" className="outline-4 border-2" placeholder={``} />
          </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="amount" className="text-md">Amount</Label>
                <Input
                {...register("amount")}
                id="amount"
                name="amount"
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

              <div className="flex flex-col gap-2">
                <Label htmlFor="recievedDate" className="text-md">Recieved Date</Label>
                <Input

                {...register("recievedDate")}
                id="recievedDate"
                name="recievedDate"
                  className="border-2"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category" className="text-md">Category</Label>
                <Select name="category"   onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="w-[140px] border-2">
                    <SelectValue placeholder="Ads" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[1001]">
                    <SelectItem value="Ads">Ads</SelectItem>
                    <SelectItem value="Others">Other</SelectItem>
                    <SelectItem value="Salary">Salary</SelectItem>
                    <SelectItem value="Passive">Passive</SelectItem>
                    <SelectItem value="Youtube">Youtube</SelectItem>
                    <SelectItem value="Trading">Trading</SelectItem>
                    <SelectItem value="Shares">Shares</SelectItem>
                  </SelectContent>
                </Select>
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
