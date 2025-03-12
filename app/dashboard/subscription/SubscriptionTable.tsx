"use client"

import SubscriptionModal from "@/components/Modals/SubscriptionModal"
import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { DateFormatter } from "@/lib/DateFormatter"
import axios from "axios"
import { Edit2, IndianRupee, Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { SubscriptionType } from "./subsApi"
  
  
  interface TableFormat{
    name:string,
    price?:string,
    RenewalDate:string,
    StartDate:string,
    notes:string,
    status:string
  }

  interface TableData {
    formatTable:TableFormat,
    tableData?:any
    setSubsValue:any
  }
  export default function SubscriptionTable({formatTable, tableData, setSubsValue}:TableData) {

    const [editModal, setEditModal] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<SubscriptionType | null>(null)

    const deleteHandler = async(data:any)=>{
      const id = toast.loading("...deleting")
      try {
        if(!data.id){
          toast.error("Subs isnt valid",{id:id})
          return;
        }        
        const deleteSubs = await axios.delete(`/api/subscription?id=${data?.id}`)
        if(deleteSubs.data.success){
          const subsData = tableData.filter((val:any)=>{
            return val.id != data.id
          })
          setSubsValue(subsData)
        }
        toast.success("Successfully deleted",{
          id:id
        })
      } catch (error) {
        if(axios.isAxiosError(error)){
          toast.error(error.message ||"Something went wrong",{id:id})
        }else{
          const err = (error as Error).message
          toast.error(err,{
            id:id
          })
        }
      }
    }

    const editHandler = (data:any)=>{
        setCurrentData(data)
        setEditModal(true)
    }


    return (
      <div>
        <div>
        <Table className="border-2  w-full " suppressHydrationWarning>
  
  
  <TableHeader className="">
    <TableRow className="bg-[#F4F4F4] rounded-md">
      <TableHead className="p-4 text-left">{formatTable.name || "Name"}</TableHead>
      <TableHead className="p-4 text-left">{formatTable.price || "Amount"}</TableHead>
        <TableHead className="p-4 text-left">{formatTable.StartDate || "Received Date"}</TableHead>
      <TableHead className="p-4 text-left">{formatTable.RenewalDate || "Category"}</TableHead>
      <TableHead className="p-4 text-left">{formatTable.status || "Category"}</TableHead>
        
      <TableHead className="p-4 text-left">{formatTable.notes || "Note"}</TableHead>
      <TableHead className="p-4 text-center">{"Action"}</TableHead>
    </TableRow>
  </TableHeader>
  {
    tableData.length == 0 ? <TableRow>
    <TableCell colSpan={7} className="h-28 text-center">
      No Data
    </TableCell>
  </TableRow>:<TableBody>
    {tableData.map((data: any, index: number) => (
   <TableRow key={index} className="border-b">
   <TableCell className="p-4 text-left font-medium capitalize underline">
     <a href={data.url}>{data.name}</a>
   </TableCell>
 
   <TableCell className="p-4 text-left">
     <div className="flex flex-col gap-1">
       <p className="flex items-center gap-1">
         <IndianRupee className="w-3 h-3" /> {data.amount || data.price}
       </p>
       <p className="text-sm font-normal">
         {data.paid === "monthly" ? "per month" : "per year"}
       </p>
     </div>
   </TableCell>
 
   <TableCell className="p-4 text-left">{DateFormatter(data.createdAt)}</TableCell>
 
   <TableCell className="p-4 text-left capitalize">{DateFormatter(data.renewal_date)}</TableCell>
 
   <TableCell className="p-4 text-left">
     <p
      //  className={`px-2 py-1 rounded-md ${
      //    data.active ? "bg-green-200" : "bg-red-300"
      //  }`}
     >
       {data.active ? "🟢 Active" : "🔴 Cancelled"}
     </p>
   </TableCell>
 
   <TableCell className="p-4 text-left capitalize">{data.notes}</TableCell>
 
   <TableCell className="p-4 text-center">
     <div className="flex items-center gap-2 justify-center">
       <button
         onClick={() => editHandler(data)}
         className="text-blue-500 hover:underline"
       >
         <Edit2 className="w-4 h-4 text-black" />
       </button>
 
       <button
         onClick={() => deleteHandler(data)}
         className="text-red-500 hover:underline"
       >
         <Trash2 className="w-4 h-4 text-black" />
       </button>
     </div>
   </TableCell>
 </TableRow>
 
    ))}
  </TableBody>
  }

  
</Table>
        </div>
        {
          editModal &&   <SubscriptionModal title ={"Edit Subscription"} setSubsValue={setSubsValue} modal={editModal} setModal={setEditModal} api={"api"} data={currentData} edit={true}/>
        }
       
      </div>


    )
  }
  