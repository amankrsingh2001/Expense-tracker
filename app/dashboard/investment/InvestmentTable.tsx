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
    amount?:string,
    Date:string,
    category:string,
    notes:string,
    price?:string,
    paidVia?:string
    unit:string
  }

  interface TableData {
    formatTable:TableFormat,
    tableData?:any
  }
  export default function InvestmentTable({formatTable, tableData}:TableData) {
    console.log(tableData)

    return (

      <div>
        <div>
        <Table className="border-2 rounded-md w-full" suppressHydrationWarning>
  
  
  <TableHeader>
    <TableRow className="bg-[#F4F4F4]">
      <TableHead className="p-4 text-left">{formatTable.name || "Name"}</TableHead>
      <TableHead className="p-4 text-left">{formatTable.amount || "Amount"}</TableHead>
      <TableHead className="p-4 text-left">{formatTable.unit || "Units"}</TableHead>
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
  
        <TableCell className="p-4 text-left  ">{data.unit}</TableCell>
        <TableCell className="p-4 text-left">{DateFormatter(data.createdAt)}</TableCell>
        <TableCell className="p-4 text-left capitalize">{data.category}</TableCell>
      
        <TableCell className="p-4 text-left capitalize ">{data.notes || "No notes added"}</TableCell>
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
  