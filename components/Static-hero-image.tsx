import { IndianRupee } from "lucide-react";

export default function StaticHeroImage() {
    return (
      <div className="w-full h-[500px] rounded-lg  p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-lg ">Financial Dashboard</h3>
            <p className="text-sm text-muted-foreground">Monthly Overview</p>
          </div>
          <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">March 2025</div>
        </div>
  
        {/* Bar Chart */}
        <div className="mb-8">
          <h4 className="font-medium mb-2">Monthly Expenses</h4>
          <div className="flex items-end h-32 gap-2">
            {[30, 45, 25, 60, 40, 80].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-primary/70 rounded-t-sm" style={{ height: `${height}%` }}></div>
                <span className="text-xs mt-1 ">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Pie Chart */}
        <div className="flex gap-6 mb-8 ">
          <div className="relative w-24 h-24 ">
            <svg viewBox="0 0 100 100" className="w-full h-full  -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#000" strokeWidth="15" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#f0f2f1"
                strokeWidth="15"
                strokeDasharray="251.2"
                strokeDashoffset="62.8"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">75%</span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-2">Budget Status</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Food</span>
                  <span className="font-medium">&#8377;420 / &#8377;500</span>
                </div>
                <div className="h-2 bg-muted rounded-full mt-1">
                  <div className="h-2 bg-primary rounded-full" style={{ width: "84%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Transport</span>
                  <span className="font-medium">&#8377;120 / &#8377;200</span>
                </div>
                <div className="h-2 bg-muted rounded-full mt-1">
                  <div className="h-2 bg-primary rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Line Chart */}
        <div>
          <h4 className="font-medium mb-2">Savings Growth</h4>
          <div className="h-24 relative">
          <svg viewBox="0 0 100 40" className="w-full h-full text-black dark:text-white">
                <polyline
                    points="0,35 20,28 40,30 60,20 80,15 100,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <circle cx="0" cy="35" r="1.5" fill="currentColor" />
                <circle cx="20" cy="28" r="1.5" fill="currentColor" />
                <circle cx="40" cy="30" r="1.5" fill="currentColor" />
                <circle cx="60" cy="20" r="1.5" fill="currentColor" />
                <circle cx="80" cy="15" r="1.5" fill="currentColor" />
                <circle cx="100" cy="5" r="1.5" fill="currentColor" />
          </svg>
            <div className="absolute bottom-0  left-0 right-0 h-px bg-muted"></div>
          </div>
        </div>
      </div>
    )
  }
  
  