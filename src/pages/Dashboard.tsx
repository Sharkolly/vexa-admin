import { useState } from "react";

export default function VendorDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* MAIN */}
      <div className="flex-1 ml-0 md:ml-64">
        {/* TOP BAR */}
        <div className="bg-white shadow px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-blue-700 font-bold"
          >
            ☰
          </button>

          <h2 className="font-semibold text-blue-700">Dashboard Overview</h2>

          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-6">
          {/* CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card title="Total Sales" value="₦120,000" />
            <Card title="Orders" value="340" />
            <Card title="Products" value="56" />
            <Card title="Pending" value="12" />
          </div>

          {/* CHART PLACEHOLDER */}
          <div className="bg-white rounded-xl shadow p-5 h-64">
            <h3 className="font-semibold text-blue-700 mb-2">
              Sales Analytics
            </h3>
            <div className="h-full bg-blue-50 rounded-lg flex items-center justify-center text-blue-400">
              Chart Area
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-blue-700 mb-4">Recent Orders</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-blue-700 border-b">
                  <tr>
                    <th className="py-2">Product</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <tr key={i} className="border-b">
                      <td className="py-7 ">Product {i}</td>
                      <td>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                          Pending
                        </span>
                      </td>
                      <td>₦25,000</td>
                      <td>Today</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* CARD */
function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-600">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold text-blue-700">{value}</h2>
    </div>
  );
}
