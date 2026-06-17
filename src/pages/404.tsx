import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Search } from "lucide-react";
import { useState } from "react";

const NotFound = () => {
  const navigate = useNavigate();

  const [searchProduct, setSearchProduct] = useState("");

  const changeSearchProduct = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearchProduct(e.target.value);
  };

  const searchProductHandler = () => {
    navigate(`/search?product=${searchProduct}`);
  };

  return (
    <div>
      <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
        <main className="flex-grow pt-24">
          <section className="max-w-[1440px] mx-auto px-16 py-32 flex flex-col items-center justify-center text-center max-md:px-5 ">
            {" "}
            <div className="relative mb-4">
              <span className="text-[180px] font-black text-slate-200 leading-none select-none tracking-wide">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  alt="Error Graphic"
                  className="w-64 h-64 object-contain"
                  data-alt="A clean, minimalist 3D rendering of a floating, translucent white box that is slightly cracked, revealing a vibrant electric indigo glow from within. The box is suspended in a bright, airy gallery space with soft, diffused white lighting and subtle shadows on the light gray floor. The aesthetic is high-end corporate minimalism with a focus on precision and light-mode clarity."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmE6aEgJnZX6aPWvc3W4PL00Oqi2neqyI6FchS0hvBmMJgZ1InQO_Y4tJ0OWNeykKH1igejgX3kLO1ZGIaBntopdpMQwFb6E0sdi5x6SmPWhXfhLSmYy2xe4sE5mhiD_vwrG1zTRY4znceBjTiqtpFd_-MOtUOWoiNTU4yqq4Su-ApbalYxiLLp4QCt7xO371btafj_UvhuRqYKFL1GyUnPe43NZQhN3Oahv-HOQb6HYhnrZurk_IFrTuiNX3v2SUeqQuV_Qew6CI"
                />
              </div>
            </div>
            <h1 className="font-bold text-4xl max-md:text-3xl text-on-surface mt-10 mb-2 tracking-wid">
              Lost in the Digital World?
            </h1>
            <p className=" text-md text-slate-700 max-w-xl mx-auto mb-5 mt-3  ">
              The page you're looking for doesn't exist. It might have been
              moved, or perhaps it never arrived in this dimension.
            </p>
            <div className="max-md:w-11/12 flex flex-col sm:flex-row gap-5 justify-center mt-3 mb-16">
              <NavLink
                className="bg-nav-blue-active text-white px-4 py-2 rounded-xl font-medium text-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 duration-200 flex items-center justify-center gap-2"
                to="/"
              >
                <span>
                  <FaHome />
                </span>

                <p>Back to Home</p>
              </NavLink>
              <div className="flex items-center bg-surface-container px-4 py-2 rounded-xl border border-slate-400 focus-within:border-primary transition-colors">
                <span
                  className="material-symbols-outlined text-outline mr-3"
                  data-icon="search"
                >
                  <Search size={18} className="text-gray-500" />
                </span>
                <input
                  className="bg-transparent border-none focus:ring-0 font-body-md text-body-md w-full sm:w-64 font-medium outline-none"
                  placeholder="Search products..."
                  type="text"
                  onChange={(e) => changeSearchProduct(e)}
                />
              </div>

              <button className="bg-orange-400 text-white px-4  py-2 rounded-xl font-medium text-lg shadow-lg  transition-all active:scale-95 duration-200 flex items-center justify-center gap-2 cursor-pointer" onClick={searchProductHandler}>
                <span
                  className="material-symbols-outlined text-outline"
                >
                  <Search size={18} className="text-white" />
                </span>
                <p>Search</p>
              </button>
            </div>
            <div className="w-full max-w-5xl mt-12 max-md:mt-5">
              <h3 className="font-semibold text-2xl text-on-surface mb-4 text-left">
                Popular Destinations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  className="group relative overflow-hidden rounded-xl h-80 bg-slate-200 border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1"
                  to="/search?category=Electronics"
                >
                  <img
                    alt="Tech Category"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt="A macro photograph of high-end, minimalist consumer electronics featuring brushed aluminum textures and glowing LED accents. The lighting is cold and clinical, emphasizing the precision engineering and sleek luxury of the products. The background is a soft, out-of-focus white studio setting that maintains a premium corporate editorial look."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATgmLtybDFEJj8QJ9zXt2HZyLn9iioTVoZyI-faCneSaEwATIs14OqJAlD4lenz2ob5iezfXVJuIgkjmZu9nqfaUiUkFrIw3EOcM95UOYumopjCD3gze32mrPZWjilRh1xvzvbro6F9tzrI9OHpUBVUoVKpEH8wrAsJ5GHeUotBf9NqRGfT_AWxGhkKmWoU0j-Q2zLxm_GClG4Qf9LA38lvz0lOvtkPijI-Qk11hPBDwLyEgycTSKR4GKc519PCIQYVNZGMY6dHz4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-left">
                    <p className="text-white font-semibold text-2xl">Tech</p>
                    <p className="text-slate-300 font-medium text-sm uppercase tracking-widest">
                      Innovation First
                    </p>
                  </div>
                </Link>
                <Link
                  className="group relative overflow-hidden rounded-xl h-80 bg-slate-200 border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1"
                  to="/search?category=Fashion"
                >
                  <img
                    alt="Fashion Category"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt="A high-fashion editorial shot featuring clean, architectural garment silhouettes in shades of cream and charcoal.
The setting is a minimalist concrete studio with sharp, dramatic shadows and bright, direct lighting that highlights fabric textures. The overall mood is sophisticated, exclusive, and representative of a high-end fashion catalog."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr6G611_N7U2Y5a4D7KSEIfrca2wgi_Rsptdk5gH-1T7Rgfd6RRnPFJMZvwcWJfW7ZYCphMAv9U2a70pVN4yP0dzBGTY50E5rCJ6sfIMXMd0fncjbGZ5Tiw06aUnswQ7bXcFvBISIzUcDB4y_EEzB2XMfsFs9V0kxw5B1JqZCYPqWhxmmOwjA4TkbQzjel1w9Zz2FOwYIjMbOzQ7B4NNtXul72SwqKdwhPza6VDsUAbG5gbeHX8rD35WrA0JhStxkM_SWfL46ECAc"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-left">
                    <p className="text-white font-semibold text-2xl">Fashion</p>
                    <p className="text-slate-300 font-medium text-sm uppercase tracking-widest">
                      Timeless Design
                    </p>
                  </div>
                </Link>
                <Link
                  className="group relative overflow-hidden rounded-xl h-8- bg-slate-200 border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1"
                  to="/search?category=Beauty"
                >
                  <img
                    alt="Shoes Category"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt="A focused studio shot of a premium, vibrant red sneaker placed on a pristine white reflective surface. The lighting is soft and multi-directional to eliminate harsh shadows, creating a gallery-like atmosphere. The background is a clean, neutral gray gradient that emphasizes the bold color and athletic silhouette of the footwear."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Kt0lR7M7Q9VtrLejfOPNULvUNiYX-MvL6in7XmS_M4Gy8zpKalR16wYJiBigxFJXABfIQG3Dzs6OSem7Qt_FKeddS5jbR8bh7SXCu2chaXyFpqgR1RFehUDjwn2_DGzDoAabXivimyn5YXstEqR0z_2w85qxiJut4eR85u6wMO8G4nLGm0O6-JHIM509e9PARw012yAJ3P40zh1KmSCutoR4EKKucpK1PZ-awCdSDNCax1hPx_rDKKosFxCKiZTCNIR8By2jn9g"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-left">
                    <p className="text-white font-semibold text-2xl">Shoes</p>
                    <p className="text-slate-300 font-medium text-sm uppercase tracking-widest">
                      Premium Comfort
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
