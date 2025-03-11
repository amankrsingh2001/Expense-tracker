import React from "react";
import { IndianRupee, Users, Calendar, Activity } from "lucide-react";

function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-200 rounded-lg w-10 h-10" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-32" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-20" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-28" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-28" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-24" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-32" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-16" />
      </td>
    </tr>
  );
}

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
        </div>

        <div className="mb-8">
          <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
