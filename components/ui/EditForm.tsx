// import React, { useState, useEffect } from "react";
// import axios, { AxiosError } from "axios";

// export interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   category: string;
//   stock: number;
//   description: string;
//   imageUrl?: string;
// }

// const EDIT_API_URL = "https://localhost:5001/api/admin/edit";
// const DELETE_API_URL = "https://localhost:5001/api/admin/delete";
// const FETCH_PRODUCTS_URL = "https://localhost:5001/api/admin/products";

// export const VendorProductManagement: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [actionLoading, setActionLoading] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");
//   const [isError, setIsError] = useState<boolean>(false);

//   // Edit Modal State
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   // Delete Confirmation State
//   const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

//   // Fetch Vendor Products on mount


//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(FETCH_PRODUCTS_URL, {
//         withCredentials: true,
//       });
//       setProducts(response.data?.products || response.data || []);
//     } catch (err) {
//       console.error("Failed to load products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };


//     // useEffect(() => {
//     // fetchProducts();
// //   }, []);
//   // Open Edit Form Modal
//   const handleEditClick = (product: Product) => {
//     setEditingProduct({ ...product });
//     setMessage("");
//   };

//   // Handle Edit Input Changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     if (!editingProduct) return;
//     const { name, value } = e.target;
//     setEditingProduct({
//       ...editingProduct,
//       [name]: name === "price" || name === "stock" ? Number(value) : value,
//     });
//   };

//   // Submit Product Edits
//   const handleUpdateProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingProduct) return;

//     setActionLoading(true);
//     setMessage("");
//     setIsError(false);

//     try {
//       const response = await axios.post(
//         EDIT_API_URL,
//         editingProduct,
//         { withCredentials: true }
//       );

//       // Update local state list
//       setProducts((prev) =>
//         prev.map((p) => (p._id === editingProduct._id ? editingProduct : p))
//       );

//       setMessage(response.data?.message || "Product updated successfully!");
//       setIsError(false);
//       setEditingProduct(null);
//     } catch (error: unknown) {
//       const err = error as AxiosError<{ message: string }>;
//       setIsError(true);
//       setMessage(err.response?.data?.message || "Failed to update product.");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Confirm Delete
//   const handleDeleteProduct = async (id: string) => {
//     setActionLoading(true);
//     setMessage("");
//     setIsError(false);

//     try {
//       const response = await axios.post(
//         DELETE_API_URL,
//         { id },
//         { withCredentials: true }
//       );

//       // Remove from local state
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//       setMessage(response.data?.message || "Product deleted successfully.");
//       setIsError(false);
//       setDeletingProductId(null);
//     } catch (error: unknown) {
//       const err = error as AxiosError<{ message: string }>;
//       setIsError(true);
//       setMessage(err.response?.data?.message || "Failed to delete product.");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50  p-4 sm:p-6 lg:p-8  font-sans text-slate-900 w-full">
//       <div className="max-w-6l  space-y-6 lg:pl-70">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
//               Manage Products
//             </h1>
//             <p className="text-xs text-slate-500 mt-1">
//               Edit pricing, stock levels, or remove items from your store catalog.
//             </p>
//           </div>
//           <span className="self-start sm:self-center px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-full">
//             {products.length} Items Listed
//           </span>
//         </div>

//         {/* Global Notification Banner */}
//         {message && (
//           <div
//             className={`p-4 rounded-xl border text-xs font-semibold flex justify-between items-center ${
//               isError
//                 ? "bg-rose-50 border-rose-200 text-rose-700"
//                 : "bg-emerald-50 border-emerald-200 text-emerald-800"
//             }`}
//           >
//             <span>{message}</span>
//             <button
//               onClick={() => setMessage("")}
//               className="text-xs opacity-70 hover:opacity-100 font-bold"
//             >
//               ✕
//             </button>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading ? (
//           <div className="py-20 text-center text-slate-400 text-sm">
//             Loading products...
//           </div>
//         ) : products.length === 0 ? (
//           <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
//             <p className="text-slate-600 font-semibold text-sm">No products found.</p>
//             <p className="text-slate-400 text-xs">
//               Add products to your store to manage them here.
//             </p>
//           </div>
//         ) : (
//           /* Responsive Product Grid */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="space-y-3">
//                   {/* Image & Title Header */}
//                   <div className="flex items-start gap-3">
//                     <img
//                       src={
//                         product.imageUrl ||
//                         "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=60"
//                       }
//                       alt={product.name}
//                       className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
//                     />
//                     <div className="min-w-0 flex-1">
//                       <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mb-1">
//                         {product.category}
//                       </span>
//                       <h3 className="text-sm font-bold text-slate-900 truncate">
//                         {product.name}
//                       </h3>
//                       <p className="text-xs font-mono font-bold text-slate-700 mt-0.5">
//                         ₦{product.price.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
//                     {product.description || "No description provided."}
//                   </p>
//                 </div>

//                 {/* Stock & Action Buttons */}
//                 <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
//                   <span
//                     className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
//                       product.stock > 0
//                         ? "bg-slate-100 text-slate-700"
//                         : "bg-rose-50 text-rose-600"
//                     }`}
//                   >
//                     Stock: {product.stock}
//                   </span>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEditClick(product)}
//                       className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => setDeletingProductId(product._id)}
//                       className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDIT MODAL */}
//         {editingProduct && (
//           <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
//             <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl border border-slate-200 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
//               <div className="flex justify-between items-center pb-3 border-b border-slate-100">
//                 <h2 className="text-lg font-bold text-slate-900">Edit Product</h2>
//                 <button
//                   onClick={() => setEditingProduct(null)}
//                   className="text-slate-400 hover:text-slate-600 text-sm font-bold"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <form onSubmit={handleUpdateProduct} className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1">
//                     Product Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={editingProduct.name}
//                     onChange={handleInputChange}
//                     className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 mb-1">
//                       Price (₦)
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       required
//                       min={0}
//                       value={editingProduct.price}
//                       onChange={handleInputChange}
//                       className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 mb-1">
//                       Stock Count
//                     </label>
//                     <input
//                       type="number"
//                       name="stock"
//                       required
//                       min={0}
//                       value={editingProduct.stock}
//                       onChange={handleInputChange}
//                       className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     name="category"
//                     required
//                     value={editingProduct.category}
//                     onChange={handleInputChange}
//                     className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all capitalize"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1">
//                     Image URL
//                   </label>
//                   <input
//                     type="url"
//                     name="imageUrl"
//                     value={editingProduct.imageUrl || ""}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/image.jpg"
//                     className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     rows={3}
//                     value={editingProduct.description}
//                     onChange={handleInputChange}
//                     className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all resize-none"
//                   />
//                 </div>

//                 <div className="flex gap-2.5 pt-2">
//                   <button
//                     type="button"
//                     onClick={() => setEditingProduct(null)}
//                     className="w-1/3 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs transition-all"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={actionLoading}
//                     className="w-2/3 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs tracking-wider uppercase shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all"
//                   >
//                     {actionLoading ? "Saving..." : "Save Changes"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* DELETE CONFIRMATION MODAL */}
//         {deletingProductId && (
//           <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
//             <div className="bg-white max-w-sm w-full rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4 text-center">
//               <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
//                 !
//               </div>

//               <div>
//                 <h3 className="text-base font-bold text-slate-900">Delete Product?</h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Are you sure you want to remove this item? This action cannot be undone.
//                 </p>
//               </div>

//               <div className="flex gap-2 pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setDeletingProductId(null)}
//                   className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   disabled={actionLoading}
//                   onClick={() => handleDeleteProduct(deletingProductId)}
//                   className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-md shadow-rose-600/20 disabled:opacity-50 transition-colors"
//                 >
//                   {actionLoading ? "Deleting..." : "Delete"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VendorProductManagement;