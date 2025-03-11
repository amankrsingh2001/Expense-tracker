import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen w-full  text-white p-4 ">
      {/* Top metrics cards */}
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        {/* Left side - Overview title */}
        <div className="flex items-center">
          <Skeleton className="h-7 w-24" />
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />

          <Skeleton className="h-8 w-[200px] rounded-md" />

          <Skeleton className="h-8 w-[70px] rounded-md" />

          <Skeleton className="h-8 w-[100px] rounded-md" />
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6 mt-4">
        <div className="rounded-lg border border-gray-800 p-4">
          <Skeleton className="h-4 w-28 bg-gray-800 mb-3" />
          <Skeleton className="h-8 w-24 bg-gray-800" />
        </div>

        <div className="rounded-lg border border-gray-800 p-4">
          <Skeleton className="h-4 w-36 bg-gray-800 mb-3" />
          <Skeleton className="h-8 w-24 bg-gray-800" />
        </div>

        <div className="rounded-lg border border-gray-800 p-4">
          <Skeleton className="h-4 w-28 bg-gray-800 mb-3" />
          <Skeleton className="h-8 w-24 bg-gray-800" />
        </div>

        <div className="rounded-lg border border-gray-800 p-4">
          <Skeleton className="h-4 w-36 bg-gray-800 mb-3" />
          <Skeleton className="h-8 w-24 bg-gray-800" />
        </div>

        <div className="rounded-lg border border-gray-800 p-4">
          <Skeleton className="h-4 w-40 bg-gray-800 mb-3" />
          <Skeleton className="h-8 w-16 bg-gray-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <div className="rounded-lg border border-gray-800 p-4">
          <div className="flex justify-between  h-[300px] flex-col mb-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Skeleton key={i} className="h-3 w-16 bg-gray-800" />
            ))}
          </div>

          <div className="relative h-[300px] w-full ">
            <Skeleton className="absolute bottom-0 left-[20%] h-[70%] w-12 bg-blue-500/50 rounded-sm" />
            <Skeleton className="absolute bottom-0 left-[60%] h-[10%] w-12 bg-blue-500/50 rounded-sm" />
          </div>

          <div className="flex justify-between mt-2">
            <Skeleton className="h-3 w-20 bg-gray-800" />
            <Skeleton className="h-3 w-20 bg-gray-800" />
          </div>

          <div className="flex items-center mt-4">
            <Skeleton className="h-3 w-3 bg-blue-500 mr-2" />
            <Skeleton className="h-3 w-16 bg-gray-800" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 flex flex-col justify-center items-center p-4 ">
          <div className="relative w-[400px] h-[400px] ">
            <div className="absolute inset-0 rounded-full border-8 border-blue-500/50"></div>
            <div className="absolute inset-[25%] rounded-full border-8 border-blue-600/50"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 mt-12 ">
            {[
              "Income",
              "Expense",
              "Investment",
              "Subscription",
              "Available Balance",
            ].map((_, i) => (
              <div key={i} className="flex items-center  ">
                <Skeleton className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
                <Skeleton className="h-3 w-24 bg-gray-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
