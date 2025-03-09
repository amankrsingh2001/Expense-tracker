"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { DateFormatter } from "@/lib/DateFormatter"
import axios from "axios"
import { IndianRupee, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
  
  
  interface TableFormat{
    name:string,
    amount?:string,
    Date:string,
    category:string,
    notes:string,
    price?:string,
    paidVia?:string
  }

  interface TableData {
    formatTable:TableFormat,
    tableData?:any
    api:string,
    setValue:any
  }
  export default function TableFormat({formatTable, tableData, api, setValue}:TableData) {
    const deleteHandler = async(data:any)=>{
      const id = toast.loading('...deleting')
      try {
        if(!data.id){
          toast.error("Data not found",{id:id})
          return;
        }
        const deleteField = await axios.delete(`${api}?id=${data.id}`)
        if(deleteField.data.success){
          // @ts-ignore
          const newData = tableData.filter((val)=>{
            return val.id != data.id
          })
          setValue(newData)
        }
        toast.success("Deleted Successfully",{id:id})

      } catch (error) {
        
      }
    }
    
    return (

      <div>
        <div>
        <Table className="border-2 rounded-md w-full" suppressHydrationWarning>
  
  
  <TableHeader>
    <TableRow className="bg-[#F4F4F4]">
      <TableHead className="p-4 text-left">{formatTable.name || "Name"}</TableHead>
      <TableHead className="p-4 text-left">{formatTable.amount || "Amount"}</TableHead>
        <TableHead className="p-4 text-left">{formatTable.Date || "Received Date"}</TableHead>
      <TableHead className="p-4 text-left">{formatTable.category || "Category"}</TableHead>
      {
        formatTable.paidVia && <TableHead className="p-4 text-left">{formatTable.paidVia || "Category"}</TableHead>

      }
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
        <TableCell className="p-4 text-left font-medium capitalize">{data.name}</TableCell>
        <TableCell className="p-4 text-left flex items-center font-semibold "><IndianRupee className="w-3 h-3"/>{data.amount || data.price}</TableCell>
        <TableCell className="p-4 text-left">{DateFormatter(data.createdAt)}</TableCell>
        <TableCell className="p-4 text-left capitalize">{data.category}</TableCell>
        {
          formatTable.paidVia &&  <TableCell className="p-4 text-left capitalize">{data.paid_via}</TableCell>
        }
        <TableCell className="p-4 text-left capitalize">{data.notes}</TableCell>
        <TableCell className="p-4 text-center">
          <button onClick={()=>deleteHandler(data)} className="text-red-500 hover:underline"><Trash2 className="w-4 h-4 text-black"/></button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  }

  
</Table>
        </div>
       
      </div>


    )
  }
  