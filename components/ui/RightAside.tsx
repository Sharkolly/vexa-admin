import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuLightbulb } from "react-icons/lu";
import { FiLayers, FiDollarSign } from "react-icons/fi";
import { categories } from "../../data/categories";
import type { IProductFormInput } from "../../types/device.types";

type RightSideProps = {
  handleOnChange: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => void;
  product: IProductFormInput;
  setProduct: React.Dispatch<React.SetStateAction<IProductFormInput>>;
};

const RightAside = ({
  handleOnChange,
  // product,
  setProduct,
}: RightSideProps): React.JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].slug);
  const [selectedSub, setSelectedSub] = useState(
    categories[0].subCategories[0].slug,
  );
  // const [selectedBrand, setSelectedBrand] = useState(
  //   categories[0].brand[0],
  // );

  const activeCategory = categories.find(
    (c: { slug: string }) => c.slug === selectedCategory,
  );

  const categoryOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);

    const newCategoryObj = categories.find(
      (c: { slug: string }) => c.slug === newCat,
    );

    if (!newCategoryObj) return;
    setSelectedSub(newCategoryObj.subCategories[0].slug);
    setProduct((prev) => ({
      ...prev,
      category: newCat,
      subCategory: newCategoryObj.subCategories[0].slug,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Organization Card */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80 transition-all hover:shadow-md/50">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl ring-1 ring-blue-100">
            <FiLayers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">Organization</h3>
            <p className="text-xs text-gray-500 font-medium">
              Categorization and tags for search indexing
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
              value={selectedCategory}
              name="category"
              onChange={(e) => {
                categoryOnChange(e);
                handleOnChange(e);
              }}
            >
              {categories.map((category: { slug: string; name: string }) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Dropdown */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
              Sub Category <span className="text-rose-500">*</span>
            </label>
            <select
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
              value={selectedSub}
              name="subCategory"
              onChange={(e) => {
                setSelectedSub(e.target.value);
                handleOnChange(e);
              }}
            >
              {activeCategory?.subCategories.map(
                (sub: { slug: string; name: string }) => (
                  <option key={sub.slug} value={sub.slug}>
                    {sub.name}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Tags Field */}
          <div className="space-y-1.5 pt-1">
            <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
              Tags
            </label>

            {/* Existing Tag Chips */}
            <div className="flex flex-wrap gap-2 my-2" id="tag-container">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200/60 flex items-center gap-1.5">
                Wireless
                <button
                  type="button"
                  className="hover:text-blue-900 transition-colors cursor-pointer"
                >
                  <IoClose className="w-3.5 h-3.5" />
                </button>
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200/60 flex items-center gap-1.5">
                Premium
                <button
                  type="button"
                  className="hover:text-blue-900 transition-colors cursor-pointer"
                >
                  <IoClose className="w-3.5 h-3.5" />
                </button>
              </span>
            </div>

            <input
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
              placeholder="Add tag and press enter..."
              type="text"
              name="tags"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </section>

      {/* Top Brands Card (Hidden Section preserved) */}
      <section className="bg-white hidden p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Top Brands</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
              Brand
            </label>
            <select
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all"
              id="category-selector"
              onChange={handleOnChange}
            >
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Redmi">Redmi</option>
              <option value="Google">Google</option>
              <option value="Vivo">Vivo</option>
              <option value="Oppo">Oppo</option>
              <option value="Infinix">Infinix</option>
              <option value="Tecno">Tecno</option>
            </select>
          </div>
        </div>
      </section>

      {/* Pricing & Inventory Card */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80 transition-all hover:shadow-md/50">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl ring-1 ring-blue-100">
            <FiDollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              Pricing & Inventory
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Manage product pricing and stock quantities
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Base & Discount Price Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
                Base Price <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
                  ₦
                </span>
                <input
                  className="w-full pl-8 pr-3.5 py-3.5 bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-semibold transition-all placeholder:text-gray-400"
                  placeholder="0.00"
                  type="number"
                  name="price"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
                Discount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
                  ₦
                </span>
                <input
                  className="w-full pl-8 pr-3.5 py-3.5 bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-semibold transition-all placeholder:text-gray-400"
                  placeholder="0.00"
                  type="number"
                  name="discount"
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          {/* Stock Quantity */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
                Stock Quantity
              </label>
              <span className="text-[11px] font-medium text-gray-400">
                0 = Out of stock
              </span>
            </div>
            <input
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
              placeholder="0"
              type="number"
            />
          </div>

          {/* SKU Field (Hidden preserved) */}
          <div className="hidden space-y-1.5">
            <label className="block font-semibold text-xs uppercase tracking-wider text-gray-700">
              SKU <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
              placeholder="PROD-WH-001"
              type="text"
            />
          </div>

          {/* Track Inventory Checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <input
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20 transition-all cursor-pointer"
              id="track-stock"
              type="checkbox"
            />
            <label
              htmlFor="track-stock"
              className="text-xs font-semibold text-gray-700 cursor-pointer select-none"
            >
              Track inventory levels automatically
            </label>
          </div>
        </div>
      </section>

      {/* Pro Tip Box */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <LuLightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-amber-900 mb-0.5">
              Pro Seller Tip
            </h4>
            <p className="text-xs text-amber-800/90 leading-relaxed font-medium">
              Listings with accurate pricing and at least 4 clear photos convert
              up to 34% faster than incomplete listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightAside;