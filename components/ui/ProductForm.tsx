import React, { useState, useRef } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import TextareaAutosize from "react-textarea-autosize";
import { IoDocumentText } from "react-icons/io5";
import { FiChevronRight, FiUploadCloud } from "react-icons/fi";
import API from "../../api/api";
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(product);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("brand", product.brand || "");
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory);
    formData.append("discount", String(product.discount ?? 0));
    formData.append("tags", product.tags || "");
    formData.append("color", product.color);
    formData.append("condition", product.condition || "Nigerian Used");

    product.images.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });

    if (product.video instanceof File) {
      formData.append("video", product.video);
    }

    if (
      product.category === "Electronics"
      // &&
      // product.subCategory === "Phones"
    ) {
      const deviceSpecifications = {
        ram: product.deviceSpecifications?.ram ?? 0,
        rom: product.deviceSpecifications?.rom ?? 0,
        processor: product.deviceSpecifications?.processor ?? 0,
        battery_health: product.deviceSpecifications?.battery_health ?? 0,
        ibm: product.deviceSpecifications?.ibm ?? "false",
        idm: product.deviceSpecifications?.idm ?? "false",
        icm: product.deviceSpecifications?.icm ?? "false",
        sim: product.deviceSpecifications?.sim ?? "",
        inches: product.deviceSpecifications?.inches ?? 0,
        resolution: product.deviceSpecifications?.resolution ?? "",
        refresh_rate: product.deviceSpecifications?.refresh_rate ?? 0,
        NFC: product.deviceSpecifications?.NFC ?? false,
        wireless_charging:
          product.deviceSpecifications?.wireless_charging ?? false,
        fast_charging: product.deviceSpecifications?.fast_charging ?? false,
        charging_port: product.deviceSpecifications?.charging_port ?? "USB-C",
        operating_system: product.deviceSpecifications?.operating_system ?? "",
      };

      formData.append(
        "deviceSpecifications",
        JSON.stringify(deviceSpecifications),
      );
    }
    try {
      const res = await API.post("/admin/product", formData, {
        withCredentials: true,
      });
      console.log(product);
      console.log(res.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <form
      className="grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto px-4 sm:px-6 py-6"
      onSubmit={(e) => handleSubmit(e)}
    >
      {/* Left Main Form Column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Header & Breadcrumb */}
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 tracking-wide uppercase">
            <span className="hover:text-gray-700 transition-colors">
              Products
            </span>
            <FiChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-blue-600 font-bold">Add New Listing</span>
          </nav>

          <div className="pt-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              New Product Listing
            </h2>
            <p className="mt-1.5 text-sm sm:text-base font-medium text-slate-500 max-w-2xl">
              Fill in the detailed information below to list your item on the
              global marketplace.
            </p>
          </div>
        </div>

        {/* Core Description fields panel */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80 transition-all hover:shadow-md/50">
          <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl ring-1 ring-blue-100">
              <IoDocumentText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                Product Information
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Basic title and story overview of your product
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Product Name Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                  Product Name <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] font-medium text-gray-400">
                  {product.name.length}/80
                </span>
              </div>
              <input
                type="text"
                name="name"
                maxLength={80}
                onChange={handleOnChange}
                value={product.name}
                placeholder="e.g. Apple iPhone 15 Pro Max 256GB - Natural Titanium"
                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 text-sm rounded-xl font-medium p-3.5 transition-all placeholder:text-gray-400"
              />
              <p className="text-[11px] text-gray-400 font-medium">
                Avoid using ALL CAPS. Clear titles increase buyer conversion.
              </p>
            </div>

            {/* Description Input */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-xs uppercase tracking-wider text-gray-700">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                onChange={handleOnChange}
                value={product.description}
                rows={5}
                placeholder="Describe the condition, key specs, included accessories, and story of your product..."
                className="w-full rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none font-medium text-sm text-slate-900 p-3.5 transition-all placeholder:text-gray-400 leading-relaxed"
              />
            </div>
          </div>
        </section>

        {/* Media Upload Section */}
        <ImageUpload
          images={images}
          setImages={setImages}
          videoPreviewUrl={videoPreviewUrl}
          setVideoPreviewUrl={setVideoPreviewUrl}
          videoPlayerRef={videoPlayerRef}
          product={product}
          setProduct={setProduct}
        />

        {/* Specification Section */}
        <ProductSpecification
          handleOnChange={handleOnChange}
          product={product}
          setProduct={setProduct}
        />
      </div>

      {/* Right Sidebar Column */}
      <div className="space-y-6 lg:sticky lg:top-20">
        <RightAside
          handleOnChange={handleOnChange}
          product={product}
          setProduct={setProduct}
        />

        {/* Action Button Container */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
          <button
            type="submit"
            className="w-full text-white rounded-xl font-bold text-sm px-5 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiUploadCloud className="w-5 h-5" />
            <span>Publish Product Listing</span>
          </button>
          <p className="text-[11px] text-center text-gray-400 font-medium">
            Double check all specifications before publishing.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;