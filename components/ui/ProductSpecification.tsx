import React from "react";
import { BiCategory } from "react-icons/bi";
import type { IProductFormInput } from "../../types/device.types";

type ProductSpecificationProps = {
  handleOnChange: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => void;
  product: IProductFormInput;
  setProduct: React.Dispatch<React.SetStateAction<IProductFormInput>>;
};

const ProductSpecification = ({
  handleOnChange,
  product,
  setProduct,
}: ProductSpecificationProps): React.JSX.Element => {
  const handleOnChangeSpec = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      deviceSpecifications: {
        ...prev.deviceSpecifications,
        [name]: value,
      },
    }));
  };

  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80 transition-all hover:shadow-md/50">
      {/* Header Layout */}
      <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl ring-1 ring-blue-100">
          <BiCategory className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">
            Category Specifications
          </h3>
          <p className="text-xs text-gray-500 font-medium">
            Technical attributes, condition, and device hardware details
          </p>
        </div>
      </div>

      {/* Core Item Condition & Color */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
            Condition <span className="text-rose-500">*</span>
          </label>
          <select
            onChange={handleOnChange}
            name="condition"
            value={product.condition}
            className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
          >
            <option value="UK Used">UK Used</option>
            <option value="Mint">Mint</option>
            <option value="Brand New">Brand New</option>
            <option value="Open Box">Open Box</option>
            <option value="Tokunbo">Tokunbo</option>
            <option value="Refurbished">Refurbished</option>
            <option value="Damaged">Damaged</option>
            <option value="Nigerian Used">Nigerian Used</option>
            <option value="Foreign Used">Foreign Used</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
            Color
          </label>
          <input
            className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
            placeholder="e.g. Titanium Yellow, Space Gray"
            type="text"
            onChange={handleOnChange}
            name="color"
            value={product.color}
          />
        </div>
      </div>

      {/* Electronics Technical Specs (Conditional) */}
      {(product.category?.toLowerCase() === "electronics" ||
        product.category?.toLowerCase() === "electronic") && (
        <div className="mt-6 space-y-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg ring-1 ring-blue-100">
              Electronics Specifications
            </span>
          </div>

          {/* Hardware Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" id="tech-specs">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                RAM Capacity
              </label>
              <select
                onChange={handleOnChangeSpec}
                name="ram"
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
              >
                <option value="4 GB">4 GB</option>
                <option value="6 GB">6 GB</option>
                <option value="8 GB">8 GB</option>
                <option value="12 GB">12 GB</option>
                <option value="16 GB">16 GB</option>
                <option value="32 GB">32 GB</option>
                <option value="48 GB">48 GB</option>
                <option value="64 GB">64 GB</option>
                <option value="128 GB">128 GB</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                Storage
              </label>
              <select
                onChange={handleOnChangeSpec}
                name="rom"
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
              >
                <option value="64 GB (PHONE) ">64 GB (PHONE) </option>
                <option value="128 GB (PHONE) ">128 GB (PHONE) </option>
                <option value="256 GB (PHONE) ">256 GB (PHONE) </option>
                <option value="512 GB (PHONE) ">512 GB (PHONE) </option>
                <option value="1 TB">1 TB</option>
                <option value="2 TB">2 TB</option>
                <option value="3 TB">3 TB</option>
                <option value="128 GB SSD">128 GB SSD</option>
                <option value="256 GB SSD">256 GB SSD</option>
                <option value="512 GB SSD">512 GB SSD</option>
                <option value="1 TB SSD">1 TB SSD</option>
                <option value="2 TB SSD">2 TB SSD</option>
                <option value="3 TB SSD">3 TB SSD</option>
                <option value="4 TB SSD">4 TB SSD</option>
                <option value="5 TB SSD">5 TB SSD</option>
                <option value="320 GB HDD">320 GB HDD</option>
                <option value="500 GB HDD">500 GB HDD</option>
                <option value="1 TB HDD">1 TB HDD</option>
                <option value="2 TB HDD">2 TB HDD</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                  Processor
                </label>
                <span className="text-[11px] font-medium text-gray-400">
                  For laptops / PCs
                </span>
              </div>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
                placeholder="e.g. Apple M2 Max 2.7GHZ"
                type="text"
                name="processor"
                onChange={handleOnChangeSpec}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                Operating System
              </label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
                placeholder="e.g. macOS Sonoma"
                type="text"
                name="operating_system"
                onChange={handleOnChangeSpec}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                Sim
              </label>
              <select
                onChange={handleOnChangeSpec}
                name="sim"
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
              >
                <option>Dual Physical Sim</option>
                <option>Dual E-Sim</option>
                <option>Dual Physical Sim + E-Sim</option>
                <option>Single Physical Sim</option>
                <option>Single E-Sim</option>
              </select>
            </div>
          </div>

          {/* Hardware Modifiers (IDM, ICM, IBM) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                  IDM
                </label>
                <span className="text-[10px] font-medium text-gray-400">
                  Replaced Screen
                </span>
              </div>
              <select
                onChange={handleOnChangeSpec}
                name="idm"
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
              >
                <option value="false">NO</option>
                <option value="true">YES</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                  ICM
                </label>
                <span className="text-[10px] font-medium text-gray-400">
                  Replaced Camera
                </span>
              </div>
              <select
                onChange={handleOnChangeSpec}
                name="icm"
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
              >
                <option value="false">NO</option>
                <option value="true">YES</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                  IBM
                </label>
                <span className="text-[10px] font-medium text-gray-400">
                  Replaced Battery
                </span>
              </div>
              <select
                onChange={handleOnChangeSpec}
                name="ibm"
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all cursor-pointer"
              >
                <option value="false">NO</option>
                <option value="true">YES</option>
              </select>
            </div>
          </div>

          {/* Battery, Inches & Refresh Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                Battery Health
              </label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
                placeholder="e.g. 92"
                type="number"
                name="battery_health"
                onChange={handleOnChangeSpec}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                Inches
              </label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
                placeholder="e.g. 13.3"
                type="number"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                Refresh Rate
              </label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
                placeholder="e.g. 120 Hz"
                type="text"
                name="refresh_rate"
                onChange={handleOnChangeSpec}
              />
            </div>
          </div>
        </div>
      )}

      {/* Fashion Specs (Hidden Section preserved) */}
      {product.category && (
        <div className="hidden grid grid-cols-2 gap-6 mt-5" id="fashion-specs">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
              Size
            </label>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer"
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 hidden">
            <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
              Material
            </label>
            <input
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all"
              placeholder="e.g. Organic Cotton"
              type="text"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSpecification;
