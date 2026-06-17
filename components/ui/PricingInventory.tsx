const PricingInventory = () => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="font-semibold text-xl mb-4">
        Pricing & Inventory
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Price"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Discount Price"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Publish Product
        </button>
      </div>
    </section>
  );
};

export default PricingInventory;