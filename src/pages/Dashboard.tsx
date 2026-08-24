import React, { useState } from "react";

interface Order {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: "Delivered" | "Processing" | "Pending" | "Cancelled";
  itemsCount: number;
}

interface TopProduct {
  id: string;
  name: string;
  category: string;
  salesCount: number;
  revenue: number;
  stock: number;
  image: string;
}

const RECENT_ORDERS: Order[] = [
  {
    id: "VX-9821",
    customerName: "Chidi Okonkwo",
    date: "2026-08-24",
    amount: 145000,
    status: "Processing",
    itemsCount: 2,
  },
  {
    id: "VX-9820",
    customerName: "Amina Yusuf",
    date: "2026-08-24",
    amount: 82000,
    status: "Delivered",
    itemsCount: 1,
  },
  {
    id: "VX-9819",
    customerName: "Babajide Adebayo",
    date: "2026-08-23",
    amount: 310000,
    status: "Delivered",
    itemsCount: 4,
  },
  {
    id: "VX-9818",
    customerName: "Nneka Eze",
    date: "2026-08-23",
    amount: 54000,
    status: "Pending",
    itemsCount: 1,
  },
  {
    id: "VX-9817",
    customerName: "David Mensah",
    date: "2026-08-22",
    amount: 195000,
    status: "Cancelled",
    itemsCount: 3,
  },
];

const TOP_PRODUCTS: TopProduct[] = [
  {
    id: "P-101",
    name: "Minimalist Leather Tote",
    category: "Fashion & Apparel",
    salesCount: 142,
    revenue: 1207000,
    stock: 24,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "P-102",
    name: "Oversized Heavyweight Hoodie",
    category: "Fashion & Apparel",
    salesCount: 98,
    revenue: 833000,
    stock: 8,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "P-103",
    name: "Artisanal Ceramic Vase",
    category: "Home & Interior",
    salesCount: 76,
    revenue: 456000,
    stock: 45,
    image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=150&auto=format&fit=crop&q=80",
  },
];

export const VendorDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [orders] = useState<Order[]>(RECENT_ORDERS);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
    }
  };

  return (
    <div className="md:pt-20 xl:pr-10 xl:pl-70 w-full min-h-screen bg-slate-50 p-4 sm:p-6 font-sans text-slate-900 space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Store Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time performance, sales metrics, and store activity for Vexa Atelier.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200/80 rounded-xl p-1 shadow-sm flex text-xs font-semibold">
            {(["7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === range
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* KPI STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">₦3,850,000</span>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+18.4% vs last period</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Orders Fulfilled</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">342</span>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+12.1% sales volume</span>
            </div>
          </div>
        </div>

        {/* Active Store Inventory */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Products</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">84 Items</span>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>3 products low in stock</span>
            </div>
          </div>
        </div>

        {/* Pending Paystack Payout */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Settlement</span>
            <span className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">₦420,000</span>
            <p className="text-xs font-semibold text-slate-400 mt-2">Next Paystack payout tomorrow</p>
          </div>
        </div>

      </div>

      {/* ANALYTICS & TOP PRODUCTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Performance Visualizer */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Revenue Growth Breakdown</h2>
              <p className="text-xs text-slate-500">Monthly breakdown of gross order value</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Avg. ₦128.3k / Day
            </span>
          </div>

          {/* Clean CSS-driven Analytics Bar Visualization */}
          <div className="space-y-4 pt-2">
            {[
              { label: "Week 1 (Aug 1 - Aug 7)", amount: 820000, percentage: 65 },
              { label: "Week 2 (Aug 8 - Aug 14)", amount: 1150000, percentage: 88 },
              { label: "Week 3 (Aug 15 - Aug 21)", amount: 940000, percentage: 72 },
              { label: "Week 4 (Aug 22 - Aug 24)", amount: 940000, percentage: 78 },
            ].map((bar, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>{bar.label}</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(bar.amount)}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${bar.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>💡 <strong>Pro Tip:</strong> Orders peak between 6:00 PM and 9:00 PM WAT on weekdays.</span>
          </div>
        </div>

        {/* Top Selling Products List */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Top Products</h2>
            <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
              View All
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {TOP_PRODUCTS.map((prod) => (
              <div key={prod.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-11 h-11 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200/60"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{prod.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{prod.salesCount} sold • {prod.stock} in stock</p>
                  </div>
                </div>
                <span className="text-xs font-bold font-mono text-slate-900 shrink-0">
                  {formatCurrency(prod.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Customer Orders</h2>
            <p className="text-xs text-slate-500">Live order fulfillment and status tracking</p>
          </div>
          <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">{order.id}</td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{order.customerName}</td>
                  <td className="py-4 px-6 text-slate-500 font-mono">{order.date}</td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default VendorDashboard;
