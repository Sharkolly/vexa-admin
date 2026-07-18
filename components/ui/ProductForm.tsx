import React, { useState, useRef } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
import { IoDocumentText } from "react-icons/io5";

import ImageUpload from "./ImageUpload";
import type { IProductFormInput } from "../../types/device.types";
import ProductSpecification from "./ProductSpecification";
import RightAside from "./RightAside";

const ProductForm = (): React.JSX.Element => {
  const [product, setProduct] = useState<IProductFormInput>({
    name: "",
    price: 0,
    tags: "",
    description: "",
    images: [null, null, null, null],
    video: null,
    category: "Electronics",
    subCategory: "Phones",
    brand: "",
    discount: 0,
    color: "",
    deviceSpecifications: {
      rom: 0,
      ram: 0,
      processor: 0,
      battery_health: 0,
      ibm: "false",
      idm: "false",
      icm: "false",
      sim: "Dual Physical Sim",
      inches: 0,
      resolution: "",
      refresh_rate: 0,
      wireless_charging: null,
      fast_charging: null,
      charging_port: "USB-C",
      operating_system: "",
    },
    condition: "UK Used",
    size: "",
  });

  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [images, setImages] = useState<(File | string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name as keyof IProductFormInput]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <form
      className="grid lg:grid-cols-3 gap-6 items-start"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="lg:col-span-2 space-y-6">
        <div>
          <div className="text-sm flex gap-3 font-semibold mt-3">
            <p className="text-gray-500">Products</p>
            <span className="text-gray-400">&gt;</span>
            <p className="text-blue-700">Add New Listing</p>
          </div>

          <div>
            <h2 className="text-4xl mt-4 font-semibold text-gray-900">
              New Product Listing
            </h2>
            <p className="mt-2 font-medium text-slate-600">
              Fill in the detailed information below to list your item on the
              global marketplace
            </p>
          </div>
        </div>

        {/* {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )} */}

        {/* Core Description fields panel */}
        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-md">
              <IoDocumentText className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl text-gray-900">
              Product Information
            </h3>
          </div>

          <div className="space-y-7">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleOnChange}
                value={product.name}
                placeholder="Product Name"
                className="w-full bg-gray-50 border border-gray-200 focus:border-blue-800 outline-none text-slate-900 rounded-md font-medium p-3 transition"
              />
              <p className="text-xs text-gray-400 font-medium">
                Avoid using all caps. Max 80 characters
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                onChange={handleOnChange}
                rows={5}
                placeholder="Describe the story, materials and features of your product"
                className="w-full rounded-md bg-gray-50 border border-gray-200 focus:border-blue-800 outline-none font-medium text-slate-900 p-3 transition"
              />
            </div>
          </div>
        </section>

        <ImageUpload
          images={images}
          setImages={setImages}
          videoPreviewUrl={videoPreviewUrl}
          setVideoPreviewUrl={setVideoPreviewUrl}
          videoPlayerRef={videoPlayerRef}
          product={product}
          setProduct={setProduct}
        />

        <ProductSpecification handleOnChange={handleOnChange} product={product}
          setProduct={setProduct}/>
      </div>

      <div className="space-y-6">
        <RightAside handleOnChange={handleOnChange}    product={product}
          setProduct={setProduct} />

        <button
          type="submit"
          className="w-full text-white rounded-md font-bold px-4 py-3 bg-blue-700 hover:bg-blue-600 shadow-sm transition"
        >
          Publish Product Listing
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
