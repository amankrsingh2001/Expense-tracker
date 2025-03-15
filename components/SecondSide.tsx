export default function SecondSide(){
    return <div className="mt-3 hidden md:block">
    <div className="space-y-4 max-w-md">
      <h2 className="text-3xl font-bold">The simplest way to track your expenses</h2>
      <p className="text-cream-100">Take control of your finances with our intuitive expense tracking solution</p>
    </div>

    <div className="mt-8 relative">
      <div className=" rounded-lg p-8 shadow-lg">
        <h3 className="font-bold mb-4">Monthly Overview</h3>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Total Expenses</span>
              <span className="font-medium">&#8377; 1,248.42</span>
            </div>
            <div className="h-2  rounded-full overflow-hidden">
              <div className={`h-full w-3/4 bg-black`}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className=" p-5 rounded-lg shadow bg-white">
              <div className="text-xs text-gray-500">Food & Dining</div>
              <div className="text-lg font-bold">&#8377; 385.20</div>
              <div className="text-xs text-red-500">+12% vs last month</div>
            </div>

            <div className=" p-5 rounded-lg shadow bg-white">
              <div className="text-xs text-gray-500 ">Transportation</div>
              <div className="text-lg font-bold">&#8377; 215.80</div>
              <div className="text-xs text-green-500">-5% vs last month</div>
            </div>

            <div className=" p-5 rounded-lg shadow bg-white">
              <div className="text-xs text-gray-500 ">Shopping</div>
              <div className="text-lg font-bold">&#8377; 347.65</div>
              <div className="text-xs text-red-500">+8% vs last month</div>
            </div>

            <div className=" p-5 rounded-lg shadow bg-white">
              <div className="text-xs text-gray-500 ">Utilities</div>
              <div className="text-lg font-bold">&#8377; 189.32</div>
              <div className="text-xs text-gray-500">0% vs last month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
}