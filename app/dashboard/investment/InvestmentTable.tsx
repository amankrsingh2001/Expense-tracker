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
import { Edit2, IndianRupee, Pen, Trash, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import InvestmentModal from '../../../components/Modals/InvestmentModal';
import { useState } from "react"
import { InvestmentType } from "./investment"
  
  
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
    setInvestValue:any
  }
  export default function InvestmentTable({formatTable, tableData, setInvestValue}:TableData) {

    const [investModal, setInvestModal] = useState<boolean>(false)
    const [investData, setInvestData] = useState<InvestmentType | null>(null)

    const deleteHandler = async(data:any)=>{
      const id = toast.loading("...Deleting")
        try {

          if(!data.id){
            toast.error("Id isn't found",{id:id})
            return;
          }

          const deleteFiled = await axios.delete(`/api/investment?id=${data?.id}`)
          if(deleteFiled.data.success){
            // @ts-ignore
            const investData = tableData.filter((val)=>{
              return val.id != data.id
            })
            setInvestValue(investData)
          }

          toast.success("Deleted",{id:id})

        } catch (error) {
          if(axios.isAxiosError(error)){
            toast.error('Axios error',{id:id})
          }else{
            toast.error("No error",{id:id})
          }
          
        }
      }

      const editHandler = async(data:InvestmentType)=>{
        setInvestData(data)
        setInvestModal(true)
      }

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
        <TableCell className="p-4 text-center space-x-3">
          <button onClick={()=>editHandler(data)}><Edit2  className="text-black w-4 h-4"/></button>
          <button onClick={()=>deleteHandler(data)} className=""><Trash2 className="text-black w-4 h-4"/></button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  }

  
</Table>
        </div>
          {
            investModal && <InvestmentModal title="Edit Investment" modal={investModal} setModal={setInvestModal} api="" edit={true} setInvestValue={setInvestValue} data={investData}/>
          }     
      </div>


    )
  }
  