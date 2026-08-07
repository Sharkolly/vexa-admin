import React, { useState, useEffect } from "react";

// Types
export interface SpecificationItem {
  id: string;
  key: string;
  value: string;
}

export interface ProductFormData {
  _id?: string;
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
  vendorName: string;
  description: string;
  specifications: SpecificationItem[];
}

interface AdminEditProductFormProps {
  initialProduct?: Partial<ProductFormData>;
  onSave?: (updatedProduct: ProductFormData) => Promise<void> | void;
  onCancel?: () => void;
  onDelete?: (productId: string) => void;
}

// Sample initial product if none provided
const DEFAULT_PRODUCT_TO_EDIT: ProductFormData = {
  _id: "64f1a0293b821a001a123451",
  name: "Dell Latitude 7470 (Touchscreen)",
  slug: "dell-latitude-7470-touchscreen",
  price: 295000,
  discount: 5,
  category: "electronics",
  subCategory: "laptops",
  condition: "UK Used",
  stockStatus: "in_stock",
  stockQuantity: 12,
  vendorName: "Vexa Tech Hub",
  description:
    "High-performance business laptop equipped with an Intel Core i7 processor, 16GB RAM, and 512GB SSD. Features a sharp touchscreen display and durable chassis.",
  images: [
    "https://res.cloudinary.com/daqmey5dq/image/upload/v1785819003/products/images/ubklgkvnjpljzmr2kpmk.jpg",
  ],
  specifications: [
    { id: "spec-1", key: "RAM", value: "16GB DDR4" },
    { id: "spec-2", key: "Storage", value: "512GB M.2 NVMe SSD" },
    { id: "spec-3", key: "Processor", value: "Intel Core i7-6600U" },
    { id: "spec-4", key: "Display Size", value: "14 Inches Touchscreen" },
  ],
};

export const AdminEditProductForm: React.FC<AdminEditProductFormProps> = ({
  initialProduct = DEFAULT_PRODUCT_TO_EDIT,
  onSave,
  onCancel,
  onDelete,
}) => {
  // --- Form State ---
  const [formData, setFormData] = useState<ProductFormData>({
    _id: initialProduct._id || "",
    name: initialProduct.name || "",
    slug: initialProduct.slug || "",
    price: initialProduct.price ?? 0,
    discount: initialProduct.discount ?? 0,
    category: initialProduct.category || "electronics",
    subCategory: initialProduct.subCategory || "laptops",
    condition: initialProduct.condition || "Brand New",
    stockStatus: initialProduct.stockStatus || "in_stock",
    stockQuantity: initialProduct.stockQuantity ?? 0,
    vendorName: initialProduct.vendorName || "",
    description: initialProduct.description || "",
    images: initialProduct.images || [],
    specifications: initialProduct.specifications || [],
  });

  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // --- Auto Update Stock Status Based on Quantity ---
  useEffect(() => {
    if (formData.stockQuantity <= 0) {
      setFormData((prev) => ({ ...prev, stockStatus: "out_of_stock" }));
    } else if (formData.stockQuantity <= 3) {
      setFormData((prev) => ({ ...prev, stockStatus: "low_stock" }));
    } else {
      setFormData((prev) => ({ ...prev, stockStatus: "in_stock" }));
    }
  }, [formData.stockQuantity]);

  // Helper: Slug Generator
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  // Field Handlers
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Image Management
  const handleAddImage = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()],
    }));
    setImageUrlInput("");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Specifications Management
  const handleAddSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        { id: `spec-${Date.now()}`, key: "", value: "" },
      ],
    }));
  };

  const handleSpecChange = (
    id: string,
    field: "key" | "value",
    val: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec) =>
        spec.id === id ? { ...spec, [field]: val } : spec
      ),
    }));
  };

  const handleRemoveSpecification = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((spec) => spec.id !== id),
    }));
  };

  // Form Validation
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required.";
    if (formData.price <= 0) newErrors.price = "Valid price is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (formData.images.length === 0)
      newErrors.images = "At least one product image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setToastMessage({
        type: "error",
        text: "Please correct the highlighted errors.",
      });
      return;
    }

    setIsSubmitting(true);
    setToastMessage(null);

    try {
      if (onSave) {
        await onSave(formData);
      }
      setToastMessage({
        type: "success",
        text: "Product updated successfully!",
      });
    } catch (err: unknown) {
        console.log(err)
      setToastMessage({
        type: "error",
        text: "Failed to save product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate discounted price preview
  const finalPrice = Math.max(
    0,
    formData.price - (formData.price * formData.discount) / 100
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-3 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs sm:text-sm font-medium border shadow-xs ${
            toastMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          <span>{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-bold underline ml-4 hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Edit Product
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 pl-8">
            ID: <span className="font-mono text-gray-700">{formData._id || "New Item"}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {onDelete && formData._id && (
            <button
              type="button"
              onClick={() => onDelete(formData._id!)}
              className="px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold border border-rose-200 transition-all"
            >
              Delete Product
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-xs sm:text-sm font-semibold border border-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-edit-form"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <form id="product-edit-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Information) - Spans 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information Card */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-6 shadow-2xs space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              General Information
            </h2>

            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Product Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Dell Latitude 7470"
                className={`w-full bg-gray-50 border ${
                  errors.name ? "border-rose-500" : "border-gray-300"
                } rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all`}
              />
              {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                URL Slug <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-700 font-mono focus:bg-white focus:outline-none focus:border-blue-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, slug: generateSlug(prev.name) }))}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg border border-gray-300 flex-shrink-0"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Product Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide detailed product specifications, features, condition notes..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          {/* Pricing & Discount Card */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-6 shadow-2xs space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Pricing & Discounts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Base Price */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Regular Price (₦) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs text-gray-400">
                    ₦
                  </span>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border ${
                      errors.price ? "border-rose-500" : "border-gray-300"
                    } rounded-lg pl-8 pr-3 py-2 text-xs sm:text-sm text-gray-900 font-bold focus:bg-white focus:outline-none focus:border-blue-600 transition-all`}
                  />
                </div>
                {errors.price && <p className="text-rose-500 text-[11px] mt-1">{errors.price}</p>}
              </div>

              {/* Discount Percentage */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            {/* Price Preview Callout */}
            {formData.discount > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-between text-xs text-emerald-900">
                <span>Final Price after {formData.discount}% discount:</span>
                <span className="font-extrabold text-sm">
                  ₦{finalPrice.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Key Specifications Card */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">
                Technical Specifications
              </h2>
              <button
                type="button"
                onClick={handleAddSpecification}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                + Add Feature
              </button>
            </div>

            {formData.specifications.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-2">
                No custom specifications added yet.
              </p>
            ) : (
              <div className="space-y-2">
                {formData.specifications.map((spec) => (
                  <div key={spec.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Attribute (e.g. RAM)"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(spec.id, "key", e.target.value)}
                      className="w-1/3 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-blue-600"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 16GB)"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(spec.id, "value", e.target.value)}
                      className="w-2/3 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecification(spec.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 rounded-md hover:bg-rose-50"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Sidebar Settings) - Spans 1 col */}
        <div className="space-y-6">
          {/* Inventory & Status Card */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-6 shadow-2xs space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Inventory & Status
            </h2>

            {/* Stock Quantity */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Quantity in Stock
              </label>
              <input
                type="number"
                name="stockQuantity"
                min="0"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-900 font-semibold focus:bg-white focus:outline-none focus:border-blue-600 transition-all"
              />
            </div>

            {/* Stock Status Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Stock Status
              </label>
              <select
                name="stockStatus"
                value={formData.stockStatus}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-600"
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock Warning</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Item Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-600"
              >
                <option value="Brand New">Brand New</option>
                <option value="UK Used">UK Used</option>
                <option value="Refurbished">Refurbished</option>
                <option value="Open Box">Open Box</option>
              </select>
            </div>

            {/* Vendor Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Vendor / Supplier Name
              </label>
              <input
                type="text"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleInputChange}
                placeholder="e.g. Vexa Tech Hub"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Categorization Card */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-6 shadow-2xs space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Categorization
            </h2>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-800 capitalize focus:outline-none focus:border-blue-600"
              >
                <option value="electronics">Electronics</option>
                <option value="computing">Computing</option>
                <option value="fashion">Fashion</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Sub Category
              </label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                placeholder="e.g. laptops, phones"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Images Management Card */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-6 shadow-2xs space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Product Images <span className="text-rose-500">*</span>
            </h2>

            {/* Image URL Input */}
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://cloudinary.com/..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors flex-shrink-0"
              >
                Add Image
              </button>
            </div>
            {errors.images && <p className="text-rose-500 text-[11px]">{errors.images}</p>}

            {/* Image Preview Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {formData.images.map((imgUrl, idx) => (
                <div key={idx} className="relative group aspect-square rounded-lg border overflow-hidden bg-gray-50">
                  <img
                    src={imgUrl}
                    alt={`Product ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {idx === 0 && (
                    <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                      Main
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-rose-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProductForm;