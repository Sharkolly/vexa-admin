import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContextStore } from "../../../store/useAuthContext";
import API from "../../../api/api";
import { useState } from "react";
import type { AxiosError } from "axios";
import { RiAdminFill } from "react-icons/ri";
import { GrLinkNext } from "react-icons/gr";

const SignUp = () => {
  const {
    emailOnChange,
    firstNameOnChange,
    lastNameOnChange,
    passwordOnChange,
    email,
    firstName,
    lastName,
    password,
  } = useAuthContextStore();
  const [isFetching, setIsFetching] = useState(false);

  const [message, setMessage] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");

  const allCategories = [
    // 'Select a Category',
    "Fashion",
    "Tech",
    "Cars",
    "Shoes",
    "Hairs",
    "Home Appliances",
  ];

  const navigate = useNavigate();

  const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email, password, firstName, lastName, businessName, category);

    setIsFetching(true);
    try {
      const { data } = await API.post(
        "/admin/signup",
        { email, password, firstName, lastName, businessName, category },
        {
          withCredentials: true,
        },
      );

      localStorage.setItem("token", data?.token);
      setMessage(data?.message || "Admin Account Created Successfully");
      navigate("/login");
    } catch (error: unknown) {
      const err = error as AxiosError<{
        message: string;
        status: boolean;
      }>;
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsFetching(false);
      setTimeout(() => {
        setMessage("");
        // setError("");
      }, 5000);
    }
  };

  const [step, setStep] = useState(3);

  const businessNameOnChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setBusinessName(e.target.value);
  };

  const continueStep = () => {
    if (firstName && lastName && email) setStep(2);

    if (!firstName || !lastName || !email) {
      setMessage("Please fill all fields!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    if (businessName && category) {
      setStep(3);
    }
  };
  const backStep = () => setStep((prev) => prev - 1);
  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      <section className="hidden md:flex md:w-5/12 h-screen lg:w-1/2 relative bg-nav-blue-active items-center justify-center p-margin-desktop overflow-hidden">
        <div className="absolute inset-0 z-0 h-screeb"></div>
        <div className="relative z-10 max-w-lg text-on-primary">
          <div className="mb-6">
            <div className="flex items-center gap-3 ">
              <span className="material-symbols-outlined ">
                <RiAdminFill className="w-12 text-white h-12" />
              </span>
              <h1 className="font-display-xl text-5xl font-semibold  text-white mb-4">
                Vendor Portal
              </h1>
            </div>
            <p className="text-gray-200 tracking-wider w-110  text-md opacity-90">
              Scale your business across the globe. Our high-performance
              dashboard gives you the technical precision and luxury tools
              needed to thrive in today's digital marketplace.
            </p>
          </div>
          <div className="space-y-3 border-l-2 border-gray-500 pl-6">
            <div className="flex items-center gap-3">
              {/* <span className="material-symbols-outlined">verified</span> */}
              <p className="font-label-md text-white/80 ">
                Verified Global Marketplace
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* <span className="material-symbols-outlined">analytics</span> */}
              <p className="font-label-md text-white/80 ">
                Real-time Inventory Intelligence
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* <span className="material-symbols-outlined">payments</span> */}
              <p className="font-label-md text-white/80 ">
                Automated Secure Settlements
              </p>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-24 -right-24 w-96 h-96 opacity-20">
          <img
            className="w-full h-full object-cover rounded-full"
            data-alt="A clean, minimalist abstract visualization of business growth metrics and technical charts. The style is modern corporate with a sophisticated electric indigo and white color palette, featuring sharp lines and professional data points against a dark, elegant background. The lighting is focused and cinematic."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl55-cFQmb5inxUUEygsMv7-mBY_Ha1IY5EvWcOMGWXIWA0zWvECNhpm-U2lzjUr_tf_mE3Fh0PsF_TvHu0uy5l5YZg_W-hB3_foEhmG1pX2eyc3l-AHwDbvjNVMwqADNjSEzn23hU1VFX6ShyasbiCOSxPSzgHEyDKX1F0i1LP-q9OMka3unasbzydE7WvOUBCbF8X4Bs62biOGrxhpV7uVsEhjAiOSOvZeWnYBXI5WxJKlyK8p4SN9IuR-mA8VkCk_OzWtvMHCw"
          />
        </div>
      </section>
      <main className="flex items-center justify-center p-margin-mobile w-full md:w-7/12 lg:w-1/2 h bg-surface-container-lowest  verflow-y-auto">
        <div className="w-full max-w-lg  ">
          <div className="md:hidden mb-6 flex items-center gap-stack-sm">
            <span className="material-symbols-outlined text-primary text-3xl ">
              storefront
            </span>
            <span className="font-headline-md text-xl text-nav-blue-active">
              Vendor Portal
            </span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div
              className={`flex-1 h-1  rounded-full transition-colors duration-300 ${step === 1 ? "bg-nav-blue-active" : "bg-gray-300"}`}
              id="step-indicator-1"
            ></div>
            <div className="w-4"></div>
            <div
              className={`flex-1 h-1  rounded-full transition-colors duration-300 ${step === 2 ? "bg-nav-blue-active" : "bg-gray-300"}`}
              id="step-indicator-2"
            ></div>
            <div className="w-4"></div>
            <div
              className={`flex-1 h-1  rounded-full transition-colors duration-300 ${step === 3 ? "bg-nav-blue-active" : "bg-gray-300"}`}
              id="step-indicator-3"
            ></div>
          </div>

          <form className="relative" onSubmit={(e) => submitForm(e)}>
            {step === 1 ? (
              <div className="step-transition" id="step-1">
                <h2 className="font-semibold text-4xl mb-2">
                  Personal Identity
                </h2>
                <p className="font-medium  text-body-md text-slate-700 text-sm  mb-7 ">
                  Let's start with who you are.
                </p>
                <div className="flex flex-col gap-5 ">
                  <div className="flex justify-between gap-4 max-md:flex-col">
                    <div className="space-y-2 flex-1">
                      <label className="block font-medium   text-gray-600 ">
                        First Name
                      </label>
                      <input
                        className="w-full px-3 py-3 border-1 border-gray-300  rounded-sm   outline-none transition-all font-body-md text-on-surface placeholder:text-outline"
                        name="first_name"
                        placeholder="Enter your first name"
                        type="text"
                        onChange={(e) => firstNameOnChange(e)}
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="block font-medium   text-gray-600 ">
                        last Name
                      </label>
                      <input
                        className="w-full px-3 py-3 border-1 border-gray-300  rounded-sm   outline-none transition-all font-body-md text-on-surface placeholder:text-outline"
                        name="last_name"
                        placeholder="Enter your last name"
                        type="text"
                        onChange={(e) => lastNameOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium  text-gray-600 ">
                      Email Address
                    </label>
                    <input
                      className="w-full px-3 py-3 border  border-gray-300 rounded-sm  focus:border-primary focus:ring-0 transition-all font-body-md text-on-surface placeholder:text-outline"
                      name="email"
                      placeholder="you@company.com"
                      type="email"
                      onChange={(e) => emailOnChange(e)}
                    />
                  </div>
                </div>

                <p className={`text-red-600 py-5  text-center font-medium`}>
                  {message}
                </p>
                <button
                  className={`w-full py-3 mt-5  bg-nav-blue-active text-white text-  rounded-sm  shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 uppercase flex items-center justify-center gap-4 tracking-wider font-medium `}
                  type="button"
                  onClick={continueStep}
                >
                  <span>Continue</span>
                  <span className="material-symbols-outlined">
                    <GrLinkNext className="w-5 h-5" />
                  </span>
                </button>
              </div>
            ) : step === 2 ? (
              <div
                className="transition-all ease-in-out translate--12"
                id="step-2"
              >
                <h2 className="font-semibold text-4xl mb-2">
                  Business Profile
                </h2>
                <p className="font-medium  text-body-md text-slate-700 text-sm  mb-7">
                  Tell us about your brand.
                </p>
                <div className="flex flex-col gap-5">
                  <div className="space-y-2">
                    <label className="block font-medium   text-gray-900">
                      Business Name
                    </label>
                    <input
                      className="w-full px-3 py-3 border-1 border-gray-500  rounded-sm   outline-none transition-all font-body-md text-on-surface placeholder:text-outline"
                      name="business_name"
                      placeholder="Legal business name"
                      type="text"
                      onChange={(e) => businessNameOnChange(e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium   text-gray-900">
                      Business Category
                    </label>
                    <select
                      className="w-full px-3 py-3 border border-gray-500 rounded-sm outline-none focus:ring- transition-all font-body-md text-on-surface appearance-none bg-no-repea bg-[right_1rem_center]"
                      name="business_category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {allCategories.map((category, index) => (
                        <span key={index}>
                          <option value={category}>{category}</option>
                        </span>
                      ))}
                    </select>
                  </div>
                </div>

                <p
                  className={`${message && "inline"} hidden text-red-600 py-5 text-center font-medium`}
                >
                  {message}
                </p>
                <div className="flex gap-3 mt-6">
                  <button
                    className={`w-full py-3 mt-5  border-gray-300 bg-slate-200/90   text-slate-800  rounded-sm  shadow-md  hover:bg-primary-container active:scale-[0.98] transition-all duration-200 uppercase tracking-wider font-medium flex items-center justify-center gap-3`}
                    type="button"
                    onClick={backStep}
                  >
                    <span className="material-symbols-outlined">
                      <IoMdArrowBack className="w-5 h-5" />
                    </span>
                    <span>Back</span>
                  </button>
                  <button
                    className={`w-full py-3 mt-5  bg-nav-blue-active text-white text-  rounded-sm  shadow-lg flex items-center justify-center gap-3 hover:bg-primary-container active:scale-[0.98] transition-all duration-200 uppercase tracking-wider font-medium `}
                    type="button"
                    onClick={continueStep}
                  >
                    <span>Next</span>
                    <span className="material-symbols-outlined">
                      <GrLinkNext className="w-5 h-5" />
                    </span>
                  </button>
                </div>
              </div>
            ) : step === 3 ? (
              <div
                className="transition-all ease-in-out translate--12"
                id="step-3"
              >
                <h2 className="font-semibold text-4xl mb-2">Final Security</h2>
                <p className="font-medium  text-body-md text-slate-700 text-sm  mb-7">
                  Secure your administrator account.
                </p>
                <div className="flex flex-col gap-5">
                  <div className="space-y-2 relative">
                    <label className="block font-medium   text-gray-900">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-3 border-1 border-gray-500  rounded-sm   outline-none transition-all font-body-md text-on-surface placeholder:text-outline"
                      onChange={(e) => passwordOnChange(e)}
                      name="password"
                      placeholder="Min. 8 characters"
                      type="password"
                    />
                  </div>
                  <div className="group flex items-start gap-2 mt-3">
                    <input
                      className="mt-1 rounded border-surface-container-highest text-primary focus:ring-primary"
                      id="terms"
                      type="checkbox"
                    />
                    <label className="font-label-sm font">
                      I agree to the{" "}
                      <a className="text-primary hover:underline" href="#">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a className="text-primary hover:underline" href="#">
                        Privacy Policy
                      </a>{" "}
                      regarding my vendor account data.
                    </label>
                  </div>
                </div>

                <p
                  className={`${message === "Admin Account Created Successfully" ? "text-green-700" : "text-red-600"}  py-4 text-center font-medium`}
                >
                  {message}
                </p>
                <div className="flex flex-col gap-5 mt-6">
                  <button
                    disabled={isFetching}
                    className={`w-full py-4 mt-3 bg-nav-blue-active text-white text-  rounded-sm  shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 uppercase tracking-wider font-medium ${isFetching ? "opacity-70" : "opacity-100"} `}
                    type="submit"
                  >
                    {isFetching ? "Please wait..." : "Create Vendor Account"}
                  </button>
                  <button
                    className="w-full bg-white shadow-md font-medium rounded-sm flex items-center justify-center gap-3  border border-gray-300 text-on-surface-variant font-label-md text-black/80  py-4 hover:text-on-surface transition-all"
                    type="button"
                    onClick={backStep}
                  >
                    <span className="material-symbols-outlined">
                      <IoMdArrowBack className="w-5 h-5" />
                    </span>
                    <span>BACK TO BUSINESS DETAILS</span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </form>

          <div className="py-6 mt-5 border-t border-gray-300  text-center">
            <p className="font-label-md text-gray-800/80  text-on-surface-variant">
              Already a vendor?{" "}
              <Link
                className="text-nav-blue-active font-bold hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>{" "}
    </div>
  );
};

export default SignUp;
