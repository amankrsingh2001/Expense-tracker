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
  api:string,
  setExpenseValue:any
}


export default function ExpenseModal({title ,modal, setModal, api, setExpenseValue}: ModalData) {

  const {register, handleSubmit, setValue}  = useForm()

  const formHandler = async(data:any)=>{
    const id = toast.loading('...Adding')
    try {
      
      const addData = await axios.post(api, data)

      toast.success('Added',{
        id:id
      })
      addData.data.expense.createdAt = new Date(addData.data.expense.createdAt)
      setExpenseValue((prev:any)=>[...prev, addData.data.expense])
    } catch (error) { 

      if(axios.isAxiosError(error)){
        toast.error("axios Erros",{
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
            <Input {...register("name")} name="name" id="name" className="outline-4 border-2" placeholder="Swiggy-Biryani" />
          </div>
     

            <div className="flex flex-col gap-4">
              <div className="flex  justify-between w-full">
                <div className="w-[48%]">
                  <Label htmlFor="price" className="text-md">Price</Label>
                  <Input
                    {...register("price")}
                    id="price"
                    name="price"
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
                  <Label htmlFor="spentDate" className="text-md ">Spent Date</Label>
                  <Input
                  {...register("spentDate")}
                  id="spentDate"
                  name="spentDate"
                    className="border-2"
                    type="date"
                    max={new Date().toISOString().split("T")[0]} 
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div className="flex  justify-between w-full">
                <div className="w-[48%]">
                  <Label className="text-md">Category</Label>
                  <Select onValueChange={(value)=>setValue("category", value)}>
                    <SelectTrigger className="w-[200px] border-2">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Essentials</SelectLabel>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="grocery">Grocery</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>Expenses</SelectLabel>
                        <SelectItem value="bills">Bills</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="online-order">
                          Online Order
                        </SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>Leisure</SelectLabel>
                        <SelectItem value="entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>Payments</SelectLabel>
                        <SelectItem value="emi">EMI</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="debt">Debt</SelectItem>
                        <SelectItem value="loan">Loan</SelectItem>
                      </SelectGroup>

                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-[48%] ">
                  <Label className="text-md">Paid Via</Label>
                  <Select onValueChange={(value)=>setValue("paidVia", value)}>
                    <SelectTrigger className=" border-2">
                      <SelectValue placeholder="Ads" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Debit Card">Debit Card</SelectItem>
                      <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                      <SelectItem value="Net Banking">Net Banking</SelectItem>
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
