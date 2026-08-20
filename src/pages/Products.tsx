import React, { useState, useMemo } from "react";
// import API from "../../api/api";
// import type { AxiosError } from "axios";
import { useQueryProduct } from "../../lib/useQuery";

// Types
export interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  category: string;
  subCategory: string;
  condition: string;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  stockQuantity: number;
  images: string[];
  vendorName?: string;
  createdAt: string;
}

interface AdminProductListProps {
  // products?: ProductItem[];
  onEditProduct?: (productId: string) => void;
  onDeleteProduct?: (productId: string) => void;
  onAddNewProduct?: () => void;
}

export const AdminProductList: React.FC<AdminProductListProps> = ({
  onEditProduct,
  onDeleteProduct,
  onAddNewProduct,
}) => {

  // const [products, setProducts] = useState<ProductItem[] | []>([])

  const { data } = useQueryProduct(`/admin/product`);

  
  const products: ProductItem[] = data?.data || []


  // const getData = async () => {
  //       try {
  //         const response = await API.get("/admin/product", {
  //           withCredentials: true,
  //           headers: { "Cache-Control": "no-cache" },
  //         });
  //         const {data} = await response.data
  //         setProducts(data)
  //       } catch (error) {
  //         if (error) {
  //           const axiosError = error as AxiosError<{ message?: string }>;
  //           return axiosError;
  //         }
  //       }
  //     }
  //       getData()


  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        item.category.toLowerCase() === categoryFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "all" || item.stockStatus === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // --- Bulk Selection Handlers ---
  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProducts.map((p) => p._id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- Stats Calculation ---
  const stats = useMemo(() => {
    return {
      total: products.length,
      inStock: products.filter((p) => p.stockStatus === "in_stock").length,
      lowStock: products.filter((p) => p.stockStatus === "low_stock").length,
      outOfStock: products.filter((p) => p.stockStatus === "out_of_stock").length,
    };
  }, [products]);

  // Format Currency
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Status Badge Helper
  const renderStatusBadge = (status: ProductItem["stockStatus"], qty: number) => {
    switch (status) {
      case "in_stock":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            In Stock ({qty})
          </span>
        );
      case "low_stock":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Low Stock ({qty})
          </span>
        );
      case "out_of_stock":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Out of Stock
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4  max-md:pt-15   xl:pl-70   md:pt-20    w-full xl:pr-10 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Products Catalog
            </h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {products.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage inventory, update prices, monitor stock levels, and edit details.
          </p>
        </div>

        <button
          onClick={onAddNewProduct}
          type="button"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-xs active:scale-[0.98] transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Product</span>
        </button>
      </div>

      {/* Metric Cards Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-200/80 p-3.5 sm:p-4 rounded-xl shadow-2xs">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Total Inventory
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white border border-gray-200/80 p-3.5 sm:p-4 rounded-xl shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
            In Stock
          </p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-700 mt-1">{stats.inStock}</p>
        </div>
        <div className="bg-white border border-gray-200/80 p-3.5 sm:p-4 rounded-xl shadow-2xs">
          <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
            Low Stock Warnings
          </p>
          <p className="text-xl sm:text-2xl font-bold text-amber-700 mt-1">{stats.lowStock}</p>
        </div>
        <div className="bg-white border border-gray-200/80 p-3.5 sm:p-4 rounded-xl shadow-2xs">
          <p className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">
            Out of Stock
          </p>
          <p className="text-xl sm:text-2xl font-bold text-rose-700 mt-1">{stats.outOfStock}</p>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 sm:p-4 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, category, or slug..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-9 pr-8 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:border-blue-600 capitalize flex-1 sm:flex-initial"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="computing">Computing</option>
          </select>

          {/* Stock Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:border-blue-600 flex-1 sm:flex-initial"
          >
            <option value="all">All Stock Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Selected Action Banner */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-blue-900">
          <span className="font-semibold">
            {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-gray-600 hover:underline mr-2"
            >
              Deselect All
            </button>
            <button
              type="button"
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1.5 rounded-md text-xs transition-colors shadow-2xs"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. DESKTOP PRODUCT TABLE (Visible on md: and larger)     */}
      {/* ========================================================= */}
      <div className="hidden md:block bg-white border border-gray-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginatedProducts.length > 0 &&
                      selectedIds.length === paginatedProducts.length
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Condition</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No products found matching criteria.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => {
                  const isSelected = selectedIds.includes(product._id);
                  return (
                    <tr
                      key={product._id}
                      className={`hover:bg-gray-50/60 transition-colors ${
                        isSelected ? "bg-blue-50/30" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(product._id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* Product Thumbnail & Details */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0] || "/placeholder.png"}
                            alt={product.name}
                            loading="lazy"
                            className="w-15 h-15 rounded-sm object-cover border border-gray-200 bg-gray-50 flex-shrink-0"
                          />
                          <div className="max-w-xs">
                            <h3 className="font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                              <span className="truncate">Slug: {product.slug}</span>
                              {product.vendorName && (
                                <>
                                  <span>•</span>
                                  <span className="text-gray-500">{product.vendorName}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category & Subcategory with CSS Capitalize */}
                      <td className="py-3 px-4">
                        <div className="capitalize font-medium text-gray-800">
                          {product.category}
                        </div>
                        <div className="text-[11px] text-gray-400 capitalize">
                          {product.subCategory}
                        </div>
                      </td>

                      {/* Price & Discount */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">
                          {formatNaira(product.price)}
                        </div>
                        {product.discount > 0 && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            {product.discount}% OFF
                          </span>
                        )}
                      </td>

                      {/* Condition */}
                      <td className="py-3 px-4 font-medium text-gray-600">
                        {product.condition}
                      </td>

                      {/* Stock Status Badge */}
                      <td className="py-3 px-4">
                        {renderStatusBadge(product.stockStatus, product.stockQuantity)}
                      </td>

                      {/* ACTIONS: Edit & Delete Links */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* DIRECT EDIT LINK / BUTTON */}
                          <a
                            href={`/admin/products/edit/${product._id}`}
                            onClick={(e) => {
                              if (onEditProduct) {
                                e.preventDefault();
                                onEditProduct(product._id);
                              }
                            }}
                            title="Edit Product"
                            className="p-1.5 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all flex items-center gap-1 font-semibold text-xs border border-blue-200"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            <span>Edit</span>
                          </a>

                          {/* Preview Link */}
                          <a
                            href={`/product/${product.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View on Store"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>

                          {/* Delete Action */}
                          <button
                            type="button"
                            onClick={() => onDeleteProduct?.(product._id)}
                            title="Delete Product"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE PRODUCT CARDS (Visible on < md screens)         */}
      {/* ========================================================= */}
      <div className="md:hidden flex flex-col gap-3">
        {paginatedProducts.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-xs">
            No products found matching criteria.
          </div>
        ) : (
          paginatedProducts.map((product) => {
            const isSelected = selectedIds.includes(product._id);
            return (
              <div
                key={product._id}
                className={`bg-white border rounded-xl p-3.5 shadow-2xs space-y-3 transition-colors ${
                  isSelected ? "border-blue-500 bg-blue-50/20" : "border-gray-200/80"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectOne(product._id)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <img
                    src={product.images[0] || "/placeholder.png"}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover border border-gray-200 bg-gray-50 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <div className="text-[11px] text-gray-500 capitalize mt-0.5">
                      {product.category} • {product.subCategory}
                    </div>
                    <div className="text-xs font-extrabold text-gray-900 mt-1">
                      {formatNaira(product.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <div>
                    {renderStatusBadge(product.stockStatus, product.stockQuantity)}
                  </div>

                  {/* MOBILE EDIT & ACTIONS */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`/admin/products/edit/${product._id}`}
                      onClick={(e) => {
                        if (onEditProduct) {
                          e.preventDefault();
                          onEditProduct(product._id);
                        }
                      }}
                      className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 font-bold px-3 py-1 rounded-md text-xs active:scale-95 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onDeleteProduct?.(product._id)}
                      className="p-1 text-gray-400 hover:text-rose-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 sm:p-4 shadow-2xs flex items-center justify-between text-xs text-gray-600">
        <div>
          Showing <span className="font-bold text-gray-900">{paginatedProducts.length * currentPage }</span> of{" "}
          <span className="font-bold text-gray-900">{filteredProducts.length}</span> items
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1.5 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            Previous
          </button>
          <span className="px-2 font-semibold">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1.5 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;