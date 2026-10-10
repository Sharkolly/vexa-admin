import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import API from "../../../api/api";
import { useAuthContextStore } from "../../../store/useAuthContext";
import { useQueryProduct } from "../../../lib/useQuery";

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

  // const { data } = useQueryProduct(`/admin/get-all-banks`);
  const { data } = useQueryProduct("/admin/get-all-banks");
  const allBanks = data?.data?.data || [];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userBankName, setUserBankName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [category, setCategory] = useState("electronics");

  // Bank Details State
  const [bankName, setBankName] = useState({
    name: "Access Bank",
    code: "044",
  });
  const [accountNumber, setAccountNumber] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchUserAccountName = async (
      accountNumber: string,
      bankCode: string,
    ) => {
      const { data } = await API.post(`/admin/get-user-bank-name`, {
        accountNumber,
        bankCode,
      });
      setUserBankName(data?.data?.data?.account_name);
    };

    const timeout = setTimeout(() => {
      if (accountNumber.length === 10 && bankName.code) {
        fetchUserAccountName(accountNumber, bankName.code);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [accountNumber, bankName.code]);

  // Automatically sync Account Name to First Name + Last Name
  // useEffect(() => {
  // }, [firstName, lastName]);
  // setAccountName(`${lastName} ${firstName}`.trim());
  const accountName = `${lastName} ${firstName}`.trim();

  const allCategories = [
    "electronics",
    "fashion",
    "beauty & health",
    "home & kitchen",
    "automobile",
    "sports & outdoors",
    "books & education",
    "baby products",
    "groceries",
    "pet supplies",
    "industrial & tools",
    "office supplies",
    "gaming",
    "musical instruments",
    "arts & crafts",
  ];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleNextStep = () => {
    setMessage("");
    setIsError(false);

    if (step === 1) {
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !phoneNumber.trim()
      ) {
        setIsError(true);
        setMessage("Please fill in all personal and contact details.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!businessName.trim() || !businessDescription || !category) {
        setIsError(true);
        setMessage("Please fill in your business profile information.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!accountNumber.trim() || accountNumber.length < 10 || !bankName) {
        setIsError(true);
        setMessage(
          "Please enter a valid 10-digit account number and select your bank.",
        );
        return;
      }
      setStep(4);
    }
  };

  const handleBackStep = () => {
    setMessage("");
    setIsError(false);
    if (step === 4) setStep(3);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || password.length < 8) {
      setIsError(true);
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!acceptedTerms) {
      setIsError(true);
      setMessage(
        "You must agree to the Terms of Service to complete registration.",
      );
      return;
    }

    setIsFetching(true);
    setMessage("");
    setIsError(false);

    try {
      const { data } = await API.post(
        "/admin/signup",
        {
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
          businessName,
          category,
          bankName,
          accountNumber,
          accountName,
          businessDescription,
        },
        { withCredentials: true },
      );

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      setMessage(data?.message || "Vendor Account Created Successfully!");
      setIsError(false);

      timerRef.current = setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string; status: boolean }>;
      setIsError(true);
      setMessage(
        err.response?.data?.message ||
          "Registration failed. Please verify your details and try again.",
      );
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-600 selection:text-white">
      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Background Image Hero Panel */}
        <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col justify-between p-12 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1556742049-0a67dd3f12d4?q=80&w=1200&auto=format&fit=crop"
              alt="Vendor Onboarding background"
              className="w-full h-full object-cover opacity-35 scale-105"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <img
            src="https://res.cloudinary.com/daqmey5dq/image/upload/v1791611726/fexa-logo.svg"
            alt="FEXA Logo"
            width="180"
          />

          {/* Glass Card Value Prop */}
          <div className="relative z-20 space-y-4">
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 p-8 rounded-2xl shadow-2xl space-y-4">
              <h2 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                Power your sales network with automated bank payouts.
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                Connect your verified Nigerian bank account, receive fast
                automatic settlements, and manage inventory seamlessly on FEXA.
              </p>
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Direct payouts to all major Nigerian Banks
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Automated account name identity check
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Multi-Step Form */}
        <section className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-white">
          <div className="max-w-xl w-full mx-auto my-auto space-y-8">
            {/* Header & Login Link */}
            <div className="flex items-center justify-between">
              {/* <NavLink to="/" className="inline-block mb-4"> */}
              <img
                src="https://res.cloudinary.com/daqmey5dq/image/upload/v1791612665/fexa-dark-logo.svg"
                alt="FEXA Logo"
                width="180"
              />
              {/* </NavLink> */}
              <div className="flex items-center gap-2 lg:hidden">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                  V
                </div>
                <span className="font-bold text-slate-900">VEXA</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 ml-auto">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Stepper Header (1 -> 2 -> 3 -> 4) */}
            <div>
              <div className="flex items-center justify-between relative z-10 mb-2">
                {/* Step 1 */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= 1
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    1
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:inline ${step >= 1 ? "text-slate-900" : "text-slate-400"}`}
                  >
                    Contact
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-2 ${step >= 2 ? "bg-emerald-600" : "bg-slate-100"}`}
                />

                {/* Step 2 */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= 2
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:inline ${step >= 2 ? "text-slate-900" : "text-slate-400"}`}
                  >
                    Business
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-2 ${step >= 3 ? "bg-emerald-600" : "bg-slate-100"}`}
                />

                {/* Step 3 */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= 3
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:inline ${step >= 3 ? "text-slate-900" : "text-slate-400"}`}
                  >
                    Bank Details
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-2 ${step >= 4 ? "bg-emerald-600" : "bg-slate-100"}`}
                />

                {/* Step 4 */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 4
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    4
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:inline ${step === 4 ? "text-slate-900" : "text-slate-400"}`}
                  >
                    Security
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submitForm} className="space-y-5">
              {/* STEP 1: IDENTITY & CONTACT */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Personal & Contact Info
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Enter your personal information and active WhatsApp
                      contact.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={firstNameOnChange}
                        placeholder="e.g. Chukwuma"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={lastNameOnChange}
                        placeholder="e.g. Adebayo"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={emailOnChange}
                      placeholder="chukwuma@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+234 801 234 5678"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs tracking-wider uppercase shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all mt-2"
                  >
                    Proceed to Business Info &rarr;
                  </button>
                </div>
              )}

              {/* STEP 2: BUSINESS PROFILE */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Business Profile
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Provide your registered store details.
                    </p>
                  </div>

                  <div className="hidde">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business / Store Name
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Apex Ventures Nigeria"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div className="hidde">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Description
                    </label>
                    <span className="text-[11px] font-medium text-gray-400">
                      {businessDescription.length}/160
                    </span>
                    <textarea
                      rows={3}
                      required
                      maxLength={160}
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      placeholder="A short description about your business"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all placeholder:text-slate-400"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all capitalize cursor-pointer"
                    >
                      {allCategories.map((cat) => (
                        <option key={cat} value={cat} className="capitalize">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Sub Category
                    </label>
                    <select
                      value={category}
                      disabled={true}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all capitalize cursor-pointer"
                    >
                      {allCategories.map((cat) => (
                        <option key={cat} value={cat} className="capitalize">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div> */}

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="w-1/3 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs tracking-wider uppercase transition-all"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-2/3 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs tracking-wider uppercase shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all"
                    >
                      Proceed to Bank Info &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: BANK DETAILS */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Bank & Payout Setup
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Enter your bank account details for settlement payouts.
                    </p>
                  </div>

                  {/* Explicit Name Match Warning / Requirement Banner */}
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                    <p className="font-bold flex items-center gap-1.5 mb-1 text-amber-800">
                      <svg
                        className="w-4 h-4 text-amber-600 shrink-0 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Important Bank Verification Rule:
                    </p>
                    Your bank account full name{" "}
                    <strong>must be the exact same</strong> as the First Name
                    and Last Name you provided (
                    <strong>
                      {lastName || "Last"} {firstName || "First"}
                    </strong>
                    ). Payouts will fail if the names do not match.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Select Bank
                    </label>
                    <select
                      value={bankName.code}
                      onChange={(e) => {
                        const selectedBank = allBanks.find(
                          (bank: { name: string; code: string }) =>
                            bank.code === e.target.value,
                        );
                        if (selectedBank) setBankName(selectedBank);
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all cursor-pointer"
                    >
                      {allBanks.map((bank: { name: string; code: string }) => (
                        <>
                          <option
                            key={bank.name}
                            value={bank.code}
                            className="capitalize"
                          >
                            {bank.name}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Account Number (10 Digits)
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={accountNumber}
                      onChange={(e) =>
                        setAccountNumber(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="0123456789"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all placeholder:text-slate-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Account Holder Full Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={
                        accountNumber.length == 10 ? userBankName : accountName
                      }
                      placeholder="First Name Last Name"
                      className="w-full px-3.5 py-2.5 uppercase bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 cursor-not-allowed select-none"
                    />
                    <p className="text-[11px] text-slate-500 mt-1 hidden font-medium">
                      Locked to First Name + Last Name (
                      <strong>
                        {/* {lastName || "Last"} */}
                        {/* {firstName || "First"} */}

                        {userBankName}
                      </strong>
                      ). Go back to Step 1 if you need to edit your name.
                    </p>
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="w-1/3 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs tracking-wider uppercase transition-all"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-2/3 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs tracking-wider uppercase shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all"
                    >
                      Proceed to Security &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: SECURITY & TERMS */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Account Security
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Create a password to complete your vendor registration.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={passwordOnChange}
                        placeholder="Min. 8 characters"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all placeholder:text-slate-400 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 cursor-pointer"
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs text-slate-600 leading-snug cursor-pointer select-none"
                    >
                      I confirm that my account name matches my legal name and
                      agree to the{" "}
                      <a
                        href="#"
                        className="font-semibold text-emerald-600 hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="font-semibold text-emerald-600 hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="submit"
                      disabled={isFetching}
                      className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs tracking-wider uppercase shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isFetching
                        ? "Creating Account..."
                        : "Complete Registration"}
                    </button>
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      &larr; Back to Bank Details
                    </button>
                  </div>
                </div>
              )}

              {/* Alert Message Banner */}
              {message && (
                <div
                  className={`p-3.5 rounded-xl capitalize border text-xs font-semibold text-center ${
                    isError
                      ? "bg-rose-50 border-rose-200 text-rose-700"
                      : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>

          <footer className="text-center text-xs text-slate-400 pt-6">
            &copy; {new Date().getFullYear()} VEXA Inc. All rights reserved.
          </footer>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
