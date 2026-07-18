// import { useState } from "react";
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
}: ProductSpecificationProps) => {
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

  // if (!category) setCategory("");
  return (
    <>
      <section className="bg-white  rounded-xl p-8 shadow-sm ">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-nav-blue-active p-2 bg-nav-blue-active/10 rounded-md">
            <BiCategory className="w-7 h-7 " />
          </span>
          <h3 className="font-semibold text-xl">Category Specifications</h3>
        </div>
        {product.category.toLowerCase() == "electronics" && (
          <>
            <div className="grid grid-cols-2  gap-6" id="tech-specs">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">RAM Capacity</label>
                <select
                  onChange={handleOnChangeSpec}
                  name="ram"
                  className="w-full px-4 py-3 outline-none    border border-gray-300/70  rounded-sm   focus:rings transition-all font-body-md text-body-md"
                >
                  <option value="4 GB">4 GB</option>
                  <option value="8 GB">8 GB</option>
                  <option value="16 GB">16 GB</option>
                  <option value="32 GB">32 GB</option>
                  <option value="48 GB">48 GB</option>
                  <option value="64 GB">64 GB</option>
                  <option value="128 GB">128 GB</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Storage</label>
                <select
                  onChange={handleOnChangeSpec}
                  name="rom"
                  className="w-full outline-none px-4 py-3  text-gray-500     border border-gray-300/70  rounded-sm  tracking-wider font-medium focus:ring-0 transition-all font-body-md text-body-md"
                >
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
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">
                  Processor{" "}
                  <span className="text-xs text-gray-400">( for laptops )</span>
                </label>
                <input
                  className="w-full px-4 py-3    border border-gray-300/70  rounded-sm   focus:ring-0 outline-none transition-all font-body-md text-body-md"
                  placeholder="e.g. Apple M2 Max 2.7GHZ"
                  type="number"
                  name="processor"
                  onChange={handleOnChangeSpec}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">
                  Operating System
                </label>
                <input
                  className="w-full px-4 py-3    border border-gray-300/70 smtransparent rounded-md  outline-none  transition-all font-body-md text-body-md"
                  placeholder="e.g. macOS Sonoma"
                  type="text"
                  name="operating_system"
                  onChange={handleOnChangeSpec}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Sim</label>
                <select
                  onChange={handleOnChangeSpec}
                  name="sim"
                  className="w-full outline-none px-4 py-3  text-gray-500     border border-gray-300/70  rounded-sm  tracking-wide font-medium focus:ring-0 transition-all font-body-md text-body-md"
                >
                  <option>Dual Physical Sim</option>
                  <option>Dual E-Sim</option>
                  <option>Dual Physical Sim + E-Sim</option>
                  <option>Single Physical Sim</option>
                  <option>Single E-Sim</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Condition</label>
                <select
                  onChange={handleOnChange}
                  name="condition"
                  className="w-full outline-none px-4 py-3  text-gray-500     border border-gray-300/70  rounded-sm  tracking-wide font-medium focus:ring-0 transition-all font-body-md text-body-md"
                >
                  <option value="UK Used">UK Used</option>
                  <option value="Brand New">Brand New</option>
                  <option value="Open Box">Open Box</option>
                  <option value="Tokunbo">Tokunbo</option>
                  <option value="Refurbished">Refurbished</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Nigerian Used">Nigerian Used</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-between w-full mt-6 ">
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-medium text-gray-5 ">
                  IDM{" "}
                  <span className="text-xs text-gray-400">
                    ( Replaced Screen )
                  </span>
                </label>
                <select
                  onChange={handleOnChangeSpec}
                  name="idm"
                  className="w-full outline-none px-4 py-3  text-gray-500     border border-gray-300/70  rounded-sm  tracking-wide font-medium focus:ring-0 transition-all font-body-md text-body-md"
                >
                  <option value="false">NO</option>
                  <option value="true">YES</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-medium text-gray-5 ">
                  ICM{" "}
                  <span className="text-xs text-gray-400">
                    ( Replaced Camera )
                  </span>
                </label>
                <select
                  onChange={handleOnChangeSpec}
                  name="icm"
                  className="w-full outline-none px-4 py-3  text-gray-500     border border-gray-300/70  rounded-sm  tracking-wide font-medium focus:ring-0 transition-all font-body-md text-body-md"
                >
                  <option value="false">NO</option>
                  <option value="true">YES</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-medium text-gray-5 ">
                  IBM{" "}
                  <span className="text-xs text-gray-400">
                    ( Replaced Battery )
                  </span>
                </label>
                <select
                  onChange={handleOnChangeSpec}
                  name="ibm"
                  className="w-full outline-none px-4 py-3  text-gray-500     border border-gray-300/70  rounded-sm  tracking-wide font-medium focus:ring-0 transition-all font-body-md text-body-md"
                >
                  <option value="false">NO</option>
                  <option value="true">YES</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-between w-full mt-6 ">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">
                  Battery Health
                </label>
                <input
                  className="w-full px-4 py-3    border border-gray-300/70  rounded-sm   focus:ring-0 outline-none transition-all font-body-md text-body-md"
                  placeholder="Battery health"
                  type="number"
                  name="battery_health"
                  onChange={handleOnChangeSpec}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Inches</label>
                <input
                  className="w-full px-4 py-3    border border-gray-300/70  rounded-sm   focus:ring-0 outline-none transition-all font-body-md text-body-md"
                  placeholder="e.g. 13.3 inches"
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-5 ">Refresh Rate</label>
                <input
                  className="w-full px-4 py-3    border border-gray-300/70  rounded-sm   focus:ring-0 outline-none transition-all font-body-md text-body-md"
                  placeholder="e.g. 120 Hz"
                  type="text"
                  name="refresh_rate"
                  onChange={handleOnChangeSpec}
                />
              </div>
            </div>
          </>
        )}

        {/* </div> */}

        {product.category && (
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
