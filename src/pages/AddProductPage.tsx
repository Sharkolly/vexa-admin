import Sidebar from "../../components/ui/Sidebar";
// import Nav from "../../components/ui/Nav";
import ProductForm from "../../components/ui/ProductForm";

const AddProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="lg:ml-64">        

        <main className="p-4 md:p-6 mt-16">
          <ProductForm />
        </main>
      </div>
    </div>
  );
};

export default AddProductPage;