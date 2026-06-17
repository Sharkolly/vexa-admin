import ImageUpload from "./ImageUpload";
import ProductSpecification from "./ProductSpecification";
import RightAside from "./RightAside";
// import PricingInventory from "./PricingInventory";
// import ProductTags from "./ProductTags";

const ProductForm = () => {
  return (
    <form className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <div className="text-sm flex gap-3 font-semibold mt3">
            <p>Products </p>
            <span>&gt;</span>
            <p className="text-nav-blue-active">Add New Listing</p>
          </div>

          <div>
            <h2 className='text-4xl  mt-4 font-semibold ' >New Product Listing</h2>
            <p className='mt-4 font-mediu text-slate-600' >Fill in the detailed information below to list your item on the global marketplace</p>
          </div>
        </div>

        <section className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="font-semibold text-xl mb-7">Product Information</h2>

          <div className="space-y-7">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="" className="font-medium  ">
                Product Name
              </label>
              <input
                placeholder="Product Name"
                className="w-full bg-gray-400/10 outline-none text-slate-900 rounded-md font-medium p-3"
              />

              <p className="text-sm text-gray-500 tracking-wider font-medium ">
                Avoid using all caps. Max 80 characters
              </p>
            </div>

            <div className="flex flex-col gap-2 ">
              <label htmlFor="" className="font-medium  ">
                Description
              </label>
              <textarea
                rows={5}
                placeholder="Describe the story, materials and feature of your product"
                className="w-full rounded-md bg-gray-400/10 outline-none font-medium text-slate-900  p-3"
              />
            </div>
          </div>
        </section>

        <ImageUpload />

        <ProductSpecification />
      </div>

      <div className="space-y-6">
        {/* <ProductTags /> */}
        {/* <PricingInventory /> */}

        <RightAside/>
      </div>
    </form>
  );
};

export default ProductForm;
