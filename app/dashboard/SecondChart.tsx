import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Data {
      name:string,
      value:number
      
}
export default function SecondChart({data}:{data:Data[]}) {


  const COLORS = ["#1863db", "#4287f5", "#0b709c", "#4381e6", "#487ff7", "#0e3ae8", "#035f87"];

  return (
    <div className="border-2 w-[45vw] h-[60vh] mt-10 rounded-md">
      <ResponsiveContainer width="100%"  height="100%" >
        <PieChart className="w-full h-full">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={220}
            fill="#8884d8"
            dataKey="value"

          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
