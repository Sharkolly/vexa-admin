const ProductTags = () => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="font-semibold text-xl mb-4">
        Tags
      </h2>

      <input
        placeholder="Enter tags"
        className="w-full border rounded-lg p-3"
      />
    </section>
  );
};

export default ProductTags;