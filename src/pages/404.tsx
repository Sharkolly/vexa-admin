import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  ShoppingCart,
  Search,
  ArrowLeft,
  HelpCircle,
  FileQuestion,
  Store,
} from "lucide-react";

const VendorNotFound: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/my-product?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-800 lg:pl-70 lg:pr-10">

      <main className="w-[85% flex-1 mx-auto px-4 sm:px-6  py-12 lg:py-20  flex flex-col items-center justify-center text-center">
        
        <div className="relative mb-6">
          <span className="text-[140px] sm:text-[200px] font-black text-slate-200/80 leading-none select-none tracking-tight">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-emerald-50 border border-emerald-200/80 shadow-xl shadow-emerald-700/10 flex items-center justify-center text-emerald-700 transform -rotate-6 animate-pulse">
              <FileQuestion className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
          Vendor Route Not Found
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed">
          The merchant page, product record, or admin resource you are looking for has been relocated or doesn't exist.
        </p>

        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-md flex items-center bg-white border border-slate-300 rounded-2xl p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all mb-10"
        >
          <div className="pl-3 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog or SKU in inventory..."
            className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none placeholder:text-slate-400 font-medium"
          />
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-95 shrink-0"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-emerald-700/20 transition-all active:scale-95"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Return to Portal Dashboard</span>
          </Link>
        </div>

        <div className="w-full border-t border-slate-200/80 pt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 text-center sm:text-left">
            Frequently Accessed Portal Modules
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            
            <Link
              to="/my-product"
              className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all text-left flex items-start gap-4"
            >
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Product Catalog
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Manage inventory stock, pricing, and listings.
                </p>
              </div>
            </Link>

            <Link
              to="/product-form"
              className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all text-left flex items-start gap-4"
            >
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors shrink-0">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Add New Product
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Create new storefront items or service listings.
                </p>
              </div>
            </Link>

            <Link
              to="/order"
              className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all text-left flex items-start gap-4"
            >
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors shrink-0">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Customer Orders
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Review sales, fulfillment, and customer invoices.
                </p>
              </div>
            </Link>

            <a
              href="https://vexa-shop.vercelapp/shop"
              target="_blank"
              className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all text-left flex items-start gap-4"
            >
              <div className="p-3 bg-slate-100 rounded-xl text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Live Storefront
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  View how customers see your active store page.
                </p>
              </div>
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200/80 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Vexa Merchant Platform. All rights reserved.</span>
          <a
            href="mailto:support@vexa.ng"
            className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:underline"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Contact Vendor Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default VendorNotFound;