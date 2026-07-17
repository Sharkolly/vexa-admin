import { useState } from "react";
import { BiCategory } from "react-icons/bi";

const ProductSpecification = () => {
  const [category, setCategory] = useState("electronics");
  // const category = 'electronics'

  if (!category) setCategory("");
  return (
    <>
      <section className="bg-white  rounded-xl p-8 shadow-sm ">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-nav-blue-active p-2 bg-nav-blue-active/10 rounded-md">
            <BiCategory className="w-7 h-7 " />
          </span>
          <h3 className="font-semibold text-xl">Category Specifications</h3>
        </div>
        {category == "electronics" && (
          <>
            <div className="grid grid-cols-2  gap-6" id="tech-specs">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">RAM Capacity</label>
                <select className="w-full px-4 py-3 outline-none  bg-gray-200/10  border border-gray-300/70  rounded-sm   focus:rings transition-all font-body-md text-body-md">
                  <option>4 GB</option>
                  <option>8 GB</option>
                  <option>16 GB</option>
                  <option>32 GB</option>
                  <option>48 GB</option>
                  <option>64 GB</option>
                  <option>128 GB</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Storage</label>
                <select className="w-full outline-none px-4 py-3  text-gray-500   bg-gray-200/10  border border-gray-300/70  rounded-sm  tracking-wider font-medium focus:ring-0 transition-all font-body-md text-body-md">
                  <option>128 GB SSD</option>
                  <option>256 GB SSD</option>
                  <option>512 GB SSD</option>
                  <option>1 TB SSD</option>
                  <option>2 TB SSD</option>
                  <option>3 TB SSD</option>
                  <option>4 TB SSD</option>
                  <option>5 TB SSD</option>
                  <option>320 GB HDD</option>
                  <option>500 GB HDD</option>
                  <option>1 TB HDD</option>
                  <option>2 TB HDD</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Processor</label>
                <input
                  className="w-full px-4 py-3  bg-gray-200/10  border border-gray-300/70  rounded-sm   focus:ring-0 outline-none transition-all font-body-md text-body-md"
                  placeholder="e.g. Apple M2 Max"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">
                  Operating System
                </label>
                <input
                  className="w-full px-4 py-3  bg-gray-200/10  border border-gray-300/70 smtransparent rounded-md  outline-none  transition-all font-body-md text-body-md"
                  placeholder="e.g. macOS Sonoma"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Sim</label>
                <select className="w-full outline-none px-4 py-3  text-gray-500   bg-gray-200/10  border border-gray-300/70  rounded-sm  tracking-wide font-medium focus:ring-0 transition-all font-body-md text-body-md">
                  <option>Dual Physical Sim</option>
                  <option>Dual E-Sim</option>
                  <option>Dual Physical Sim + E-Sim</option>
                  <option>Single Physical Sim</option>
                  <option>Single E-Sim</option>
                </select>
              </div>
              {/* <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-5 ">Condition</label>
              <select className="w-full outline-none px-4 py-3  text-gray-500  -gray-200//37  bordersmransparent  rounded-md  tracking-wider font-medium focus:ring-0 transition-all font-body-md text-body-md">
                <option>UK Used</option>
                <option>Brand New</option>
                <option>Open Box</option>
                <option>Tokunbo</option>
                <option>Refurbished</option>
                <option>Damaged</option>
                <option>Nigerian Used</option>
              </select>
            </div> */}
              <div className="flex flex-col  gap-2">
                <label className="font-medium text-gray-5 ">Processor</label>
                <input
                  className="w-full px-4 py-3  bg-gray-200/10  border border-gray-300/70  rounded-sm   focus:ring-0 outline-none transition-all font-body-md text-body-md"
                  placeholder="e.g. Apple M2 Max"
                  type="text"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-between w-full mt-6 ">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">
                  Battery Health
                </label>
                <input
                  className="w-full px-4 py-3  bg-gray-200/10  border border-gray-300/70  rounded-sm   focus:ring-0 outline-none transition-all font-body-md text-body-md"
                  placeholder="Battery health"
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Inches</label>
                <input
                  className="w-full px-4 py-3  bg-gray-200/10  border border-gray-300/70  rounded-sm   focus:ring-0 outline-none transition-all font-body-md text-body-md"
                  placeholder="e.g. 13.3 inches"
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Refresh Rate</label>
                <input
                  className="w-full px-4 py-3  bg-gray-200/10  border border-gray-300/70  rounded-sm   focus:ring-0 outline-none transition-all font-body-md text-body-md"
                  placeholder="e.g. 120 Hz"
                  type="text"
                />
              </div>
            </div>
          </>
        )}

        {/* </div> */}

        {category === "fashion" && (
          <div className="hidde grid grid-cols-2 gap-6 mt-5" id="fashion-specs">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-5 ">Size</label>
              <div className="flex gap-2">
                <button
                  className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center font-bold text-label-md hover:bg-primary hover:text-white transition-colors"
                  type="button"
                >
                  XS
                </button>
                <button
                  className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center font-bold text-label-md hover:bg-primary hover:text-white transition-colors"
                  type="button"
                >
                  S
                </button>
                <button
                  className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center font-bold text-label-md hover:bg-primary hover:text-white transition-colors"
                  type="button"
                >
                  M
                </button>
                <button
                  className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center font-bold text-label-md hover:bg-primary hover:text-white transition-colors"
                  type="button"
                >
                  L
                </button>
                <button
                  className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center font-bold text-label-md hover:bg-primary hover:text-white transition-colors"
                  type="button"
                >
                  XL
                </button>
                <button
                  className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center font-bold text-label-md hover:bg-primary hover:text-white transition-colors"
                  type="button"
                >
                  XXL
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-5 ">Material</label>
              <input
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md   focus:ring-0 transition-all font-body-md text-body-md"
                placeholder="e.g. Organic Cotton"
                type="text"
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductSpecification;
