import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

export default function DateSelect(){
    return <div className="border-2 rounded-md ml-2 ">
              <Select >
    <SelectTrigger  className="h-[32px] hover:rounded-md  b w-full min-w-[100px] rounded-bl-none rounded-tl-none !border-border p-2  hover:bg-accent focus:ring-0 focus-visible:!ring-1 focus-visible:!ring-gray-400 dark:bg-muted dark:hover:opacity-[0.8]">
        <SelectValue className="overflow-hidden text-ellipsis whitespace-nowrap" placeholder="Select" />
    </SelectTrigger>
    <SelectContent className=" bg-white p-2" position="popper">
        <SelectItem value="none">Select</SelectItem>
        <SelectItem value="tdy">Today</SelectItem>
        <SelectItem value="7days">Last 7 days</SelectItem>
        <SelectItem value="30days">Last 30 days</SelectItem>
        <SelectItem value="m">Month to Date</SelectItem>
        <SelectItem value="y">Year to Date</SelectItem>
    </SelectContent>
            </Select>
    </div> 


     
}