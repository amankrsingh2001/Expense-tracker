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
import { IndianRupee } from "lucide-react"
  
  
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
  }
  export default function SubscriptionTable({formatTable, tableData}:TableData) {

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
        <TableCell className="p-4 text-left font-medium capitalize">{data.name}</TableCell>
        <TableCell className="p-4 text-left flex  flex-col font-semibold "> <p className="flex items-center"><IndianRupee className="w-3 h-3"/> {data.amount || data.price}</p> <p className="text-sm font-normal">{`${data.paid === "monthly"?"per month":"per year"}`}</p> </TableCell>
        <TableCell className="p-4 text-left">{DateFormatter(data.createdAt)}</TableCell>
        <TableCell className="p-4 text-left capitalize">{DateFormatter(data.renewal_date)}</TableCell>
        <TableCell className={`p-3 text-left capitalize flex`}><p className={`px-2 py-1 rounded-md ${data.active?"bg-green-200":"bg-red-300"} `}>{`${data.active? "Active":"Cancelled"}`}</p></TableCell>
        <TableCell className="p-4 text-left capitalize">{data.notes}</TableCell>
        <TableCell className="p-4 text-center">
          <button onClick={()=>console.log(data)} className="text-red-500 hover:underline">Delete</button>
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
  