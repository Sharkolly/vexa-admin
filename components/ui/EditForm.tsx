// import React, { useEffect, useState } from "react";
// import { categories } from "../../data/categories";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Save,
//   Trash2,
//   Upload,
//   X,
//   Plus,
//   CheckCircle2,
//   //   AlertCircle,
//   Eye,
//   Package,
//   Layers,
//   //   Sparkles,
//   //   HelpCircle,
//   //   Copy,
//   DollarSign,
//   Tag,
//   ImageIcon,
//   Check,
// } from "lucide-react";
// import { useAuthContextStore } from "../../store/useAuthContext";
// import { useQueryProduct } from "../../lib/useQuery";
// import type { IProductFormInput } from "../../types/device.types";

// const EditProduct: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const { user, refetch } = useAuthContextStore();
//   useEffect(() => {
//     refetch();
//   }, []);

//   const { data } = useQueryProduct(`/admin/product/${user?._id}/${id}`);

//   const [product, setProduct] = useState<IProductFormInput | null>(data?.data);  
//   const [newImageInput, setNewImageInput] = useState("");
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [toastMessage, setToastMessage] = useState<string | null>(null);

//   // New Variant Inputs
//   const [newVariantName, setNewVariantName] = useState("Color");
//   const [newVariantValue, setNewVariantValue] = useState("");
//   const [newVariantStock, setNewVariantStock] = useState<number>(10);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value, type } = e.target;
//     if (type === "checkbox") {
//       const checked = (e.target as HTMLInputElement).checked;
//       setProduct((prev) => (
//         prev ? { ...prev, [name]: checked } : null));
//     } else if (type === "number") {
//       setProduct((prev) => ( prev ?
//          {
//         ...prev,
//         [name]: value === "" ? 0 : parseFloat(value),
//       } : null ));
//     } else {
//       setProduct((prev) => (prev ? { ...prev, [name]: value } : null));
//     }
//   };

//   // Auto-generate Slug on Title change if manually edited
//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const name = e.target.value;
//     const generatedSlug = name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)+/g, "");

//     setProduct((prev) =>
//       prev
//         ? {
//             ...prev,
//             name,
//             slug: generatedSlug,
//           }
//         : null,
//     );
//   };

//   // Media Handlers
//   const handleAddImage = () => {
//     if (newImageInput.trim()) {
//       setProduct((prev) => (
//         prev ? {
//         ...prev,
//         images: [...prev.images, newImageInput.trim()],
//       } : null));
//       setNewImageInput("");
//       setShowImageModal(false);
//     }
//   };

//   const handleRemoveImage = (indexToRemove: number) => {
//     setProduct((prev) => (
//         prev ?{
//       ...prev,
//       images: prev.images.filter((_, idx) => idx !== indexToRemove),
//     }: null));
//   };

//   // Save Submit Mock
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSaving(true);

//     setTimeout(() => {
//       setIsSaving(false);
//       setToastMessage("Product changes saved successfully!");
//       setTimeout(() => setToastMessage(null), 3000);
//     }, 1000);
//   };

//   const resolveImage = (
//     img: string | File | null | undefined,
//     fallback: string,
//   ) =>
//     typeof img === "string"
//       ? img
//       : img instanceof File
//         ? URL.createObjectURL(img)
//         : fallback;


//          const [selectedCategory, setSelectedCategory] = useState(categories[0].slug);
//           const [selectedSub, setSelectedSub] = useState(
//             categories[0].subCategories[0].slug,
//           );
        
//           const activeCategory = categories.find(
//             (c: { slug: string }) => c.slug === selectedCategory,
//           );
        
//           const categoryOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//             const newCat = e.target.value;
//             setSelectedCategory(newCat);
        
//             const newCategoryObj = categories.find(
//               (c: { slug: string }) => c.slug === newCat,
//             );
        
//             if (!newCategoryObj) return;
//             setSelectedSub(newCategoryObj.subCategories[0].slug);
//             // setProduct((prev) => ({
//             //   ...prev,
//             //   category: newCat,
//             //   subCategory: newCategoryObj.subCategories[0].slug,
//             // }));
//           };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 lg:ml-64">
//       {/* --- TOAST NOTIFICATION --- */}
//       {toastMessage && (
//         <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 animate-bounce">
//           <CheckCircle2 className="w-5 h-5 text-emerald-400" />
//           <span className="text-sm font-semibold">{toastMessage}</span>
//         </div>
//       )}

//       {/* --- PAGE HEADER & BAR --- */}
//       <div className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-sm backdrop-blur-md bg-white/90">
//         <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             {/* Breadcrumb & Navigation */}
//             <div>
//               <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
//                 <Link
//                   to="/products"
//                   className="hover:text-emerald-700 transition-colors flex items-center gap-1"
//                 >
//                   <ArrowLeft className="w-3.5 h-3.5" />
//                   Products
//                 </Link>
//                 <span>/</span>
//                 <span className="text-slate-800 font-semibold">
//                   {product?._id }
//                 </span>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-3">
//               <a
//                 href={`/vexa.shop.vercel.app/vendor/${user?._id}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
//               >
//                 <Eye className="w-4 h-4 text-slate-500" />
//                 <span className="hidden sm:inline">View in Store</span>
//               </a>

//               <button
//                 type="button"
//                 onClick={() => navigate("/products")}
//                 className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 disabled={isSaving}
//                 className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-emerald-700/20 active:scale-95 transition-all disabled:opacity-50"
//               >
//                 {isSaving ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Save Changes</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- FORM CONTENT GRID --- */}
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//         >
//           {/* ================= LEFT / MAIN COLUMN (2/3) ================= */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* 1. BASIC DETAILS CARD */}
//             <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
//               <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//                 <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
//                   <Package className="w-5 h-5 text-emerald-600" />
//                   Basic Information
//                 </h2>
//                 <span className="text-xs text-slate-400">
//                   Required fields *
//                 </span>
//               </div>

//               {/* Title */}
//               <div>
//                 <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
//                   Product Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={product?.name}
//                   onChange={handleTitleChange}
//                   placeholder="e.g. Premium Leather Sneakers"
//                   required
//                   className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
//                 />
//               </div>

//               {/* URL Slug */}
//               <div>
//                 <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
//                   URL Slug
//                 </label>
//                 <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
//                   <span className="pl-4 pr-1 text-xs text-slate-400 font-mono">
//                     {`vexa.shop.vercel.app/products/${product?.category}/${product?.subCategory}/`}
//                   </span>
//                   <input
//                     type="text"
//                     name="slug"
//                     disabled
//                     value={`${product?.slug}/${product?._id}`}
//                     onChange={handleInputChange}
//                     className="w-full bg-transparent py-3 pr-4 text-xs font-mono text-slate-800 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
//                   Product Description
//                 </label>
//                 <textarea
//                   name="description"
//                   rows={5}
//                   value={product.description}
//                   onChange={handleInputChange}
//                   placeholder="Write a detailed product description..."
//                   className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all leading-relaxed"
//                 />
//               </div>
//             </div>

//             {/* 2. MEDIA GALLERY CARD */}
//             <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
//               <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//                 <div>
//                   <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
//                     <ImageIcon className="w-5 h-5 text-emerald-600" />
//                     Product Media & Gallery
//                   </h2>
//                   <p className="text-xs text-slate-500 mt-0.5">
//                     First image will be displayed as the main cover photo.
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => setShowImageModal(true)}
//                   className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition-all"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Image URL
//                 </button>
//               </div>

//               {/* Image Grid */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 {product?.images.map((imgUrl, index) => (
//                   <div
//                     key={index}
//                     className={`group relative aspect-square rounded-2xl overflow-hidden border bg-slate-100 transition-all ${
//                       index === 0
//                         ? "ring-2 ring-emerald-500 border-transparent shadow-md"
//                         : "border-slate-200 hover:border-slate-300"
//                     }`}
//                   >
//                     <img
//                       //   src={imgUrl}
//                       src={resolveImage(imgUrl, "")}
//                       alt={`Product Media ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />

//                     {/* Primary Badge */}
//                     {index === 0 && (
//                       <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
//                         Primary
//                       </span>
//                     )}

//                     {/* Image Action Overlay */}
//                     <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
//                       {index !== 0 && (
//                         <button
//                           type="button"
//                           onClick={() => handleSetPrimaryImage(index)}
//                           title="Set as Primary Image"
//                           className="p-2 bg-white text-slate-900 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all"
//                         >
//                           <Check className="w-4 h-4" />
//                         </button>
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveImage(index)}
//                         title="Remove Image"
//                         className="p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Upload Placeholder */}
//                 <button
//                   type="button"
//                   onClick={() => setShowImageModal(true)}
//                   className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 flex flex-col items-center justify-center p-4 text-center transition-all group"
//                 >
//                   <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 mb-1 transition-colors" />
//                   <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-700">
//                     Upload New
//                   </span>
//                 </button>
//               </div>
//             </div>

//             {/* 3. VARIANTS & ATTRIBUTES CARD */}
//             <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
//               <div className="border-b border-slate-100 pb-4">
//                 <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
//                   <Layers className="w-5 h-5 text-emerald-600" />
//                   Product Variants
//                 </h2>
//                 <p className="text-xs text-slate-500 mt-0.5">
//                   Manage options like sizes, colors, or materials.
//                 </p>
//               </div>

//               {/* Add Variant Bar */}
//               <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row gap-3 items-end">
//                 <div className="w-full sm:w-1/3">
//                   <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
//                     Option Name
//                   </label>
//                   <select
//                     value={newVariantName}
//                     onChange={(e) => setNewVariantName(e.target.value)}
//                     className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800"
//                   >
//                     <option value="Color">Color</option>
//                     <option value="Size">Size</option>
//                     <option value="Material">Material</option>
//                     <option value="Storage">Storage</option>
//                   </select>
//                 </div>

//                 <div className="w-full sm:w-1/3">
//                   <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
//                     Option Value
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g. XL, Matte Red"
//                     value={newVariantValue}
//                     onChange={(e) => setNewVariantValue(e.target.value)}
//                     className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
//                   />
//                 </div>

//                 <div className="w-full sm:w-1/4">
//                   <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
//                     Stock
//                   </label>
//                   <input
//                     type="number"
//                     value={newVariantStock}
//                     onChange={(e) =>
//                       setNewVariantStock(parseInt(e.target.value) || 0)
//                     }
//                     className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1"
//                 >
//                   <Plus className="w-3.5 h-3.5" />
//                   Add
//                 </button>
//               </div>

//             </div>
//           </div>

//           {/* ================= RIGHT SIDEBAR COLUMN (1/3) ================= */}
//           <div className="space-y-6">
//             {/* 1. PRICING & FINANCIALS CARD */}
//             <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
//               <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
//                 <DollarSign className="w-5 h-5 text-emerald-600" />
//                 Pricing & Profit
//               </h2>

//               {/* Regular Price */}
//               <div>
//                 <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
//                   Regular Price (₦) *
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
//                     ₦
//                   </span>
//                   <input
//                     type="number"
//                     name="price"
//                     value={product?.price}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//               </div>

//               {/* Sale Price */}
//               <div className="hidden">
//                 <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
//                   Discount / Sale Price (₦)
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
//                     ₦
//                   </span>
//                   <input
//                     type="number"
//                     name="salePrice"
//                     value={(product?.price ?? 0) * 0.9}
//                     onChange={handleInputChange}
//                     placeholder="Leave empty if no sale"
//                     className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//               </div>

//               {/* Vexa Commission Ledger Breakdown */}
//               <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 space-y-2">
//                 <div className="flex justify-between text-xs text-slate-600">
//                   <span>Effective List Price:</span>
//                   <span className="font-bold text-slate-900">
//                     ₦{product?.price.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-xs text-slate-600">
//                   <span>Vexa Platform Fee (10%):</span>
//                   <span className="font-semibold text-rose-600">
//                     - ₦{((product?.price ?? 0) / 10).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="pt-2 border-t border-emerald-200 flex justify-between text-xs font-bold text-emerald-800">
//                   <span>Vendor Payout Earnings:</span>
//                   <span>₦{((product?.price ?? 0) * 0.9).toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>

//             {/* 2. INVENTORY & STOCK CARD */}
//             <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
//               <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
//                 <Package className="w-5 h-5 text-emerald-600" />
//                 Inventory Management
//               </h2>

//               {/* SKU */}
//               <div>
//                 <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
//                   SKU (Stock Keeping Unit)
//                 </label>
//                 <input
//                   type="text"
//                   name="sku"
//                   value={product.sku}
//                   onChange={handleInputChange}
//                   className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               {/* Stock Quantity */}
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
//                     Total Quantity
//                   </label>
//                   <input
//                     type="number"
//                     name="stockQuantity"
//                     // value={product.stockQuantity}
//                     value={0}
//                     onChange={handleInputChange}
//                     className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
//                     Low Stock Alert
//                   </label>
//                   <input
//                     type="number"
//                     name="lowStockThreshold"
//                     value={0}
//                     onChange={handleInputChange}
//                     className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* 3. ORGANIZATION & CATEGORIZATION CARD */}
//             <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
//               <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
//                 <Tag className="w-5 h-5 text-emerald-600" />
//                 Organization
//               </h2>

         

//               <div className="space-y-5">
//                        <div className="space-y-1.5">
//                          <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
//                            Category <span className="text-rose-500">*</span>
//                          </label>
//                          <select
//                            className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
//                            value={selectedCategory}
//                            name="category"
//                            onChange={(e) => {
//                              categoryOnChange(e);
//                              handleInputOnChange(e);
//                            }}
//                          >
//                            {categories.map((category: { slug: string; name: string }) => (
//                              <option key={category.slug} value={category.slug}>
//                                {category.name}
//                              </option>
//                            ))}
//                          </select>
//                        </div>
             
//                        <div className="space-y-1.5">
//                          <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
//                            Sub Category <span className="text-rose-500">*</span>
//                          </label>
//                          <select
//                            className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
//                            value={selectedSub}
//                            name="subCategory"
//                            onChange={(e) => {
//                              setSelectedSub(e.target.value);
//                              handleOnChange(e);
//                            }}
//                          >
//                            {activeCategory?.subCategories.map(
//                              (sub: { slug: string; name: string }) => (
//                                <option key={sub.slug} value={sub.slug}>
//                                  {sub.name}
//                                </option>
//                              ),
//                            )}
//                          </select>
//                        </div>
             
                     
//                      </div>

//               {/* Assigned Vendor */}
//               <div>
//                 <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
//                   Assigned Vendor Store
//                 </label>
//                 <input
//                   type="text"
//                   value={product.vendor}
//                   disabled
//                   className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 cursor-not-allowed"
//                 />
//               </div>

    
//             </div>

//             {/* DANGER ZONE / DELETE */}
//             <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-bold text-rose-800">
//                   Archive Product
//                 </p>
//                 <p className="text-[11px] text-rose-600 mt-0.5">
//                   Remove this product from active catalog listings.
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (
//                     confirm("Are you sure you want to archive this product?")
//                   ) {
//                     product((prev) => ({ ...prev, status: "Archived" }));
//                   }
//                 }}
//                 className="p-2.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all shadow-sm"
//                 title="Archive Product"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* --- ADD IMAGE MODAL --- */}
//       {showImageModal && (
//         <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
//             <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//               <h3 className="text-base font-bold text-slate-900">
//                 Add Image URL
//               </h3>
//               <button
//                 onClick={() => setShowImageModal(false)}
//                 className="text-slate-400 hover:text-slate-600"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <p className="text-xs text-slate-500">
//               Paste a direct HTTPS image URL from Unsplash, Cloudinary, or your
//               CDN.
//             </p>

//             <input
//               type="url"
//               placeholder="https://images.unsplash.com/photo-..."
//               value={newImageInput}
//               onChange={(e) => setNewImageInput(e.target.value)}
//               className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />

//             <div className="flex justify-end gap-2 pt-2">
//               <button
//                 type="button"
//                 onClick={() => setShowImageModal(false)}
//                 className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleAddImage}
//                 className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-700/20"
//               >
//                 Add Image
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditProduct;
