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
    Date:string,
    category:string,
    notes:string,
    price?:string,
    paidVia?:string
    unit:string,
    totalInvestedPrice:string
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
      <TableHead className="p-4 text-center">{formatTable.price || "Single Stock Price"}</TableHead>
      <TableHead className="p-4 text-center">{formatTable.unit || "Units"}</TableHead>
      <TableHead className="px-2 py-4 text-center">{formatTable.totalInvestedPrice || "Total Invested Amount"}</TableHead>
        <TableHead className="p-4 text-center">{formatTable.Date || "Received Date"}</TableHead>
      <TableHead className="p-4 text-center">{formatTable.category || "Category"}</TableHead>
      {
        formatTable.paidVia && <TableHead className="p-4 text-left">{formatTable.paidVia || "Category"}</TableHead>

      }
      <TableHead className="p-4 text-center">{formatTable.notes || "Note"}</TableHead>
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
        <TableCell className="p-4 justify-center flex items-center font-semibold "><IndianRupee className="w-3 h-3"/>{data.amount || data.price}</TableCell>
  
        <TableCell className="p-4 text-center  ">{data.unit}</TableCell>
        <TableCell className="px-2 py-4 text-center flex items-center justify-center"><IndianRupee className="w-3 h-3"/> {(data.unit* data.price)}</TableCell>

        <TableCell className="p-4 text-center">{DateFormatter(data.createdAt)}</TableCell>
        <TableCell className="p-4 text-center capitalize">{data.category}</TableCell>
      
        <TableCell className="p-4 text-center capitalize ">{data.notes || "No notes added"}</TableCell>
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
  