"use client"

import { IncomeType } from "@/app/api/income/api"
import { ExpenseType } from "@/app/dashboard/expense/expenseApi"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { DateFormatter } from "@/lib/DateFormatter"
import axios from "axios"
import { Edit2, IndianRupee, Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import ExpenseModal from "@/components/Modals/ExpenseModal"
import { Apis } from "@/lib/Apis"
  
  
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
  export default function ExpenseTable({formatTable, tableData, api, setValue}:TableData) {

    const [editModal, setEditModal]= useState<boolean>(false)
    const [editdata, setEditData] = useState<ExpenseType | null >(null)
    

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
  
    const editHandler = async(data:ExpenseType)=>{
        setEditData(data)
        setEditModal(true)
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
        <TableCell className="p-4 text-left flex items-center font-semibold "><IndianRupee className="w-3 h-3"/>{ data.price}</TableCell>
        <TableCell className="p-4 text-left">{DateFormatter(data.createdAt)}</TableCell>
        <TableCell className="p-4 text-left capitalize">{data.category}</TableCell>
        {
          formatTable.paidVia &&  <TableCell className="p-4 text-left capitalize">{data.paid_via}</TableCell>
        }
        <TableCell className="p-4 text-left capitalize">{data.notes}</TableCell>
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
          editModal &&  <ExpenseModal title="Edit Expense" modal={editModal} setExpenseValue={setValue} setModal={setEditModal} api={Apis.addExpense} edit={true} data={editdata}/>
        }
       
      </div>


    )
  }
  