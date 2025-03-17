import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { ExpenseType } from "./expense/expenseApi";


export default function ExpenseChart({expense}:{expense:ExpenseType[]}) {

  return (
    <div className="border-2 w-full md:w-[45vw] h-[60vh] mt-10 rounded-md p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={expense}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis 
            dataKey="createdAt"
            tick={{ fontSize: 12 }} 
            tickFormatter={(date) => new Date(date).toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "2-digit" })}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickFormatter={(price) => `₹${price.toLocaleString()}`} 
          />
       <Tooltip
          formatter={(value) => `₹${value}`}
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
        />


          <Legend />
          <Bar dataKey="price" fill="#4287f5" barSize={80} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
