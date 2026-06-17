import { Link, useNavigate } from "react-router-dom";
import { useAuthContextStore } from "../../../store/useAuthContext";
import API from "../../../api/api";
import { useState } from "react";
import type { AxiosError } from "axios";

const SignIn = () => {
  const {
    emailOnChange,
    passwordOnChange,
    // firstNameOnChange,
    // lastNameOnChange,
    email,
    password,
    // firstName,
    // lastName,
  } = useAuthContextStore();

  const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);

    try {
      const { data } = await API.post(
        "/admin/login",
        { email, password },
        {
          withCredentials: true,
        },
      );
      localStorage.setItem("token", data?.token);
      setMessage(data?.message || "Login Successful");
      navigate("/product-form");
    } catch (error: unknown) {
      const err = error as AxiosError<{
        message: string;
        status: boolean;
        type?: string;
      }>;

      // toast.error(message, { position: "top-center" });
      // setError(err.response?.data?.type || "");
      setMessage(err.response?.data?.message || "Something went wrong");
      
    } finally {
      setIsFetching(false);
      setTimeout(() => {
        setMessage("");
        // setError("");
      }, 10000);
    }
  };
  return (
    <div className="bg-surface text-on-surface h-screen flex overflow-hidden mt-0">
      <main className="w-full lg:w-1/2 flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop z-10 bg-surface">
        <div className="w-full max-w-md">
          <div className="mb-9">
            <div className="flex items-center gap-stack-sm">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-on-primary">
                  hub
                </span>
              </div>
              <span className=" text-3xl font-bold text-nav-blue-active ">
                Vendor Portal
              </span>
            </div>
          </div>

          <div className="mb-5 space-y-3">
            <h1 className="font-semibold text-4xl text-on-background mb-unit">
              Welcome back
            </h1>
            <p className="font-body-md text-gray-700 text-on-surface-variant">
              Manage your inventory, orders, and business insights from your
              central dashboard.
            </p>
          </div>

          <form className="space-y-3" onSubmit={(e) => submitForm(e)}>
            <div className="space-y-2 ">
              <label className="font-medium text-gray-800 block">
                Work Email
              </label>
              <div className="relative">
                {/* <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span> */}
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-md  border border-gray-600  bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-body-md outline-none"
                  id="email"
                  onChange={(e) => emailOnChange(e)}
                  name="email"
                  placeholder="name@company.com"
                  type="email"
                />
              </div>

              <p className="text-slate-700 mt-2 font-medium">
                {/* {error === "EMAIL" && message} */}
              </p>
            </div>
            <div className="space-y-2 ">
              <label className="font-medium text-label-md text-on-surface-variant block">
                Password
              </label>
              <div className="relative">
                {/* <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span> */}
                <input
                  className="w-full pl-12 pr-12 py-3 rounded-md  border border-gray-600  bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-body-md outline-none"
                  id="password"
                  name="password"
                  onChange={(e) => passwordOnChange(e)}
                  placeholder="••••••••"
                  type="password"
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                  type="button"
                >
                  {/* <span className="material-symbols-outlined text-[20px]">visibility</span> */}
                </button>
              </div>
              <p className="text-red-500 mt-2 font-medium"></p>
            </div>
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  className="w-4 h-4 rounded border-gray-600  text-primary focus:ring-primary/20 transition-all"
                  type="checkbox"
                />
                <span className="font-medium text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Remember me
                </span>
              </label>
              <a
                className="font-medium text-nav-blue-active hover:underline font-semibold"
                href="#"
              >
                Forgot password?
              </a>
            </div>

            {/* <p className="text-right mt-5 font-body-md text-body-md text-slate-700">
              Already have an account?{" "}
              <Link
                className="text-nav-blue-active font-semibold hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p> */}
            <button
              disabled={isFetching}
              className={`w-full py-4 mt-3 bg-nav-blue-active text-white text-  rounded-lg shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 uppercase tracking-wider font-medium ${isFetching ? "opacity-70" : "opacity-100"} `}
              type="submit"
            >
              {isFetching ? "Please wait..." : "Login"}
            </button>

            <p
              className={`${message === "Login Succesful" ? "text-green-700" : "text-red-700"}  mt-4 text-center font-medium`}
            >
              {message}
            </p>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center z-[-1]">
              {/* <div className="w-full border-t border-gray-300 z-[-1] "></div> */}
            </div>
            <div className="relative flex justify-center text-label-sm uppercase">
              <span className="text-gray-500 font-semibold tracking-wider px-4 text-outline font-sm">
                Or continue with
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-gray-100 border border-gray-400  py-3 rounded-md  transition-colors group">
            {/* <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">corporate_fare</span> */}
            <span className="font-medium text-label-md text-gray-500 ">
              Sign in with SSO
            </span>
          </button>

          <p className="mt-7 text-center font-body-md text-body-md text-on-surface-variant">
            New to the portal?{" "}
            <Link
              className="text-nav-blue-active font-semibold hover:underline"
              to="https://wa.me/2347035439642"
            >
              Apply for Partnership
            </Link>
          </p>
        </div>
      </main>

      <aside className="hidden lg:flex w-1/2 relative overflow-hidden bg-surface-container-lowest ">
        <div className="absolute top-0 right-0 w-full h-full hidden opacity-40"></div>

        <div className="relative z-10 w-full h-full flex items-center justify-center p-stack-lg">
          {/* <div className="w-full max-w-2xl grid grid-cols-12 grid-rows-6 gap-gutter aspect-[4/5]"> */}
          <div className="w-full gap-2 aspect-[4/5] h-screen">
            <div className=" overflow-hidden shadow-2xl relative group">
              <img
                alt="Vendor Portal Office"
                className="w-full h-screen object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="A high-end, clean commercial office space with floor-to-ceiling windows showing a modern city skyline. The interior is minimal, featuring polished concrete floors and sleek indigo accents that match the Vexa brand. Warm morning sunlight streams through the glass, creating a professional yet inviting atmosphere of technological efficiency and luxury global business."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlX5On4x4Qf6bSzG6UgydOF8F2Se9Dfs4oQveAb_deyckakwjJu7yiwVI0ED8Hl8gizlueEz7PKhGySWm8W-VZ1OW3JqCVB17g5UBfyA36Y2WVtmBI6Ze8WQDjZx4praIaD6jdWguLglToK95gf5HFP95Ga69I5NU5YO79qowBFO_zzLGF53RPE2pVgUuZh-vEffT-PRaOjVBFCy5k1HNYknXnFa06ztqyr8CEy4YwpXPZShwGgVmxKAWbrYozwL0vcVX45cubq7c"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-nav-blue-primary">
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-80 mb-unit">
                  Vexa Core
                </p>
                <h3 className="font-headline-md text-headline-md">
                  Global Supply Intelligence
                </h3>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SignIn;
