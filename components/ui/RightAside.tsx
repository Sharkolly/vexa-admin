import { useState } from "react";

const RightAside = () => {
  const categories = [
    {
      name: "Electronics",
      slug: "electronics",
      subCategories: [
        { name: "Phones", slug: "phones" },
        { name: "Laptops", slug: "laptops" },
        { name: "Tablets", slug: "tablets" },
      ],
    },
    {
      name: "Fashion",
      slug: "fashion",
      subCategories: [
        { name: "Men", slug: "men" },
        { name: "Women", slug: "women" },
      ],
    },
    {
      name: "Home & Kitchen",
      slug: "home-kitchen",
      subCategories: [
        { name: "Furniture", slug: "furniture" },
        { name: "Appliances", slug: "appliances" },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].slug);
  const [selectedSub, setSelectedSub] = useState(
    categories[0].subCategories[0].slug,
  );

  const activeCategory = categories.find(
    (c: { slug: string }) => c.slug === selectedCategory,
  );

  const categoryOnChange = (
    e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);

    const newCategoryObj = categories.find(
      (c: { slug: string }) => c.slug === newCat,
    );

    if (!newCategoryObj) return;
    setSelectedSub(newCategoryObj.subCategories[0].slug);
  };

  return (
    <div className="col-span-4 flex flex-col gap-5">
      <section className="bg-white  rounded-xl p-8 shadow-sm ">
        <h3 className="font-semibold text-2xl mb-6 ">Organization</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block font-medium">Brand</label>
            <select
              className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md outline-none focus:border-nav-blue-active  focus:ring-0 transition-all font-body-md text-body-md"
              id="category-selector"
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
      <section className="bg-white  rounded-xl p-8 shadow-sm ">
        <h3 className="font-semibold text-2xl mb-6 ">Organization</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block font-medium">Category</label>

            <select
              className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md outline-none  focus:ring-0 transition"
              value={selectedCategory}
              onChange={(e) => categoryOnChange(e)}
            >
              {categories.map((category: { slug: string; name: string }) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Sub Category</label>

            <select
              className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md outline-none  focus:ring-0 transition"
              value={selectedSub}
              onChange={(e) => setSelectedSub(e.target.value)}
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

          <div>
            <label className="block font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-6" id="tag-container">
              <span className="px-3 py-1 bg-nav-blue-active/10 text-nav-blue-active text-label-sm rounded-full flex items-center gap-1">
                Wireless{" "}
                <button
                  className="material-symbols-outlined text-[14px]"
                  type="button"
                >
                  {/* close */}
                </button>
              </span>
              <span className="px-3 py-1 bg-nav-blue-active/10 text-nav-blue-active text-label-sm rounded-full flex items-center gap-1">
                Premium{" "}
                <button
                  className="material-symbols-outlined text-[14px]"
                  type="button"
                >
                  close
                </button>
              </span>
            </div>
            <input
              className="w-full px-4 py-3   bg-gray-100 border-transparent rounded-md outline-none focus:ring-0 transition-all font-body-md text-body-md"
              placeholder="Add tag..."
              type="text"
            />
          </div>
        </div>
      </section>

      <section className="bg-white  rounded-xl p-8 shadow-sm">
        <h3 className="font-semibold text-2xl mb-6">Pricing &amp; Inventory</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Base Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">
                  ₦
                </span>
                <input
                  className="w-full pl-8 pr-4 py-3 bg-gray-100 border-transparent rounded-md outline-none focus:border-nav-blue-active  focus:ring-0 transition-all font-body-md text-body-md"
                  placeholder="0.00"
                  type="number"
                />
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Discount Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">
                  ₦
                </span>
                <input
                  className="w-full pl-8 pr-4 py-3 bg-gray-100 border-transparent rounded-md outline-none focus:border-nav-blue-active  focus:ring-0 transition-all font-body-md text-body-md"
                  placeholder="0.00"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Stock Quantity</label>
            <input
              className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md outline-none focus:border-nav-blue-active  focus:ring-0 transition-all font-body-md text-body-md"
              placeholder="0"
              type="number"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">
              SKU <span className="text-gray-600">(Optional)</span>
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md outline-none focus:border-nav-blue-active  focus:ring-0 transition-all font-body-md text-body-md"
              placeholder="PROD-WH-001"
              type="text"
            />
          </div>
          <div className="flex items-center gap-3 py-2">
            <input
              //   checked
              className="w-5 h-5 rounded border-outline-variant text-nav-blue-active focus:ring-nav-blue-active"
              id="track-stock"
              type="checkbox"
            />
            <label className="text-label-md text-on-surface-variant">
              Track inventory levels
            </label>
          </div>
        </div>
      </section>

      <div className="bg-nav-blue-active/5 rounded-xl p-6 border border-nav-blue-active/20">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-nav-blue-active">
            lightbulb
          </span>
          <div>
            <h4 className="font-label-md text-label-md text-nav-blue-active font-bold mb-1">
              Pro Tip
            </h4>
            <p className="text-label-sm text-on-surface-variant">
              Products with at least 5 high-resolution images see a 34% increase
              in buyer trust and conversions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightAside;
