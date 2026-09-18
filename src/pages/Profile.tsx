import React, { useState, useEffect} from "react";
// import axios from "axios";
import { useAuthContextStore } from "../../store/useAuthContext";
import { Link } from "react-router-dom";

export interface VendorProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  storeName: string;
  storeSlug: string;
  category: string;
  description: string;
  businessAddress: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isVerified: boolean;
  avatarUrl: string;
  bannerUrl: string;
}

const NIGERIAN_BANKS = [
  "Access Bank",
  "Guaranty Trust Bank (GTB)",
  "First Bank of Nigeria",
  "Zenith Bank",
  "Kuda Bank",
  "OPay",
  "Moniepoint",
  "UBA",
];

export const AdminVendorProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "personal" | "business" | "bank" | "security"
  >("personal");
  //   const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  //   const [errorMessage, setErrorMessage] = useState<string>("");

  //   console.log(errorMessage);
  // Profile Form State
  //   const [profile, setProfile] = useState<VendorProfile>({
  //     firstName: "Alexander",
  //     lastName: "Vex",
  //     email: "vendor@vexa.shop",
  //     phone: "+234 812 345 6789",
  //     storeName: "Vexa Luxury Atelier",
  //     storeSlug: "vexa-luxury",
  //     category: "Fashion & Apparel",
  //     description: "Curated high-fashion minimalist streetwear and artisanal leather accessories.",
  //     businessAddress: "12 Marina Road, Victoria Island, Lagos",
  //     bankName: "Guaranty Trust Bank (GTB)",
  //     accountNumber: "0123456789",
  //     accountName: "Alexander Vex",
  //     isVerified: true,
  //     avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  //     bannerUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
  //   });

  const { user, refetch } = useAuthContextStore();
  console.log(user)
  // Password State

  useEffect(() => {
    refetch();
  },[]);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //   const handleInputChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  //   ) => {
  //     const { name, value } = e.target;
  //     setProfile((prev) => {
  //       const updated = { ...prev, [name]: value };
  //       // Keep bank account holder name in sync with full name
  //       if (name === "firstName" || name === "lastName") {
  //         const first = name === "firstName" ? value : prev.firstName;
  //         const last = name === "lastName" ? value : prev.lastName;
  //         updated.accountName = `${first} ${last}`.trim();
  //       }
  //       return updated;
  //     });
  //   };

  //   const handleSaveProfile = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setIsSaving(true);
  //     setErrorMessage("");

  //     try {
  //       // API call to update vendor profile
  //       await axios.post("https://localhost:5001/api/admin/profile/update", profile, {
  //         withCredentials: true,
  //       });

  //       setShowSuccessModal(true);
  //     } catch (err) {
  //       console.error("Profile save error:", err);
  //       // Fallback for demonstration if endpoint is offline
  //       setShowSuccessModal(true);
  //     } finally {
  //       setIsSaving(false);
  //     }
  //   };

  return (
    <div className="min-h-screen md:pt-20 max-md:px-8 bg-slate-50 xl:pr-10 xl:pl-70  font-sans text-slate-900">
      <div className="w-full    mx-auto space-y-8">
        {/* CINEMATIC PROFILE HEADER CARD */}
        <div className="relative bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Store Banner */}
          <div className="h-44 sm:h-56 w-full relative bg-slate-900">
            <img
              //   src={profile.bannerUrl}
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80"
              alt="Store Banner"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          {/* Avatar & Header Info */}
          <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-5 -mt-16 sm:-mt-20">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              {/* Avatar Frame */}
              <div className="relative group">
                <img
                  //   src={profile.avatarUrl}
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                  alt={user?.businessName}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white bg-white shadow-md"
                />
                <button
                  type="button"
                  className="absolute bottom-2 right-2 p-2 bg-slate-900/90 hover:bg-slate-900 text-white rounded-xl text-xs backdrop-blur-md shadow-lg transition-transform active:scale-95"
                  title="Change Avatar"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h0.93a2 2 0 001.664-.89l0.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l0.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Title & Badge */}
              <div className="space-y-1 pb-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {user?.businessName}
                  </h1>
                  {user?.email && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified Vendor
                    </span>
                  )}
                </div>
                <Link className="text-xs font-mono text-slate-500" to={`https://vexa-shop.vercel.app/vendor/${user?._id}`} >
                  My Link
                </Link>
                {/* <p className="text-xs font-mono text-slate-500">
                  vexa.shop/{user?.category}
                </p> */}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center justify-center gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
              <div className="px-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl text-center">
                <span className="block text-xs font-semibold text-slate-400">
                  Total Sales
                </span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  ₦2.4M
                </span>
              </div>
              <div className="px-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl text-center">
                <span className="block text-xs font-semibold text-slate-400">
                  Status
                </span>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* TAB NAVIGATION BAR */}
          <div className="px-6 border-t border-slate-100 flex gap-6 overflow-x-auto scrollbar-none">
            {[
              { id: "personal", label: "Personal Info" },
              { id: "business", label: "Store Details" },
              { id: "bank", label: "Paystack & Bank" },
              { id: "security", label: "Security & 2FA" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "personal" | "business")}
                className={`py-4 text-xs font-bold transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-indigo-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENTS CONTAINER */}
        <form
          // onSubmit={handleSaveProfile}
          className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6"
        >
          {/* TAB 1: PERSONAL INFO */}
          {activeTab === "personal" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Personal Information
                </h2>
                <p className="text-xs text-slate-500">
                  Manage your administrative personal contact details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={user?.firstName}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={user?.lastName}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user?.email}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={user?.phoneNumber}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all font-medium font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STORE / BUSINESS DETAILS */}
          {activeTab === "business" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Store & Business Details
                </h2>
                <p className="text-xs text-slate-500">
                  Public metadata visible to customer buyers on Vexa.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Store Display Name
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={user?.businessName}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Store Category
                  </label>
                  <select
                    name="category"
                    value={user?.category}
                    // onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all font-medium"
                  >
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Electronics & Gadgets">
                      Electronics & Gadgets
                    </option>
                    <option value="Beauty & Cosmetics">
                      Beauty & Cosmetics
                    </option>
                    <option value="Home & Interior">Home & Interior</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Store Slug (Custom Subdomain)
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <span className="px-3.5 py-2.5 text-xs text-slate-400 font-mono bg-slate-100 border-r border-slate-200 flex items-center">
                      vexa.shop/
                    </span>
                    <input
                      type="text"
                      name="storeSlug"
                      value={user?.businessName}
                      //   onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 text-sm font-mono focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Store Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    // value={user?.description}
                    // value={user?.description}
                    // onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-2 hidden">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Warehouse / Physical Pickup Address
                  </label>
                  <input
                    type="text"
                    name="businessAddress"
                    // value={user?.businessAddress}
                    // onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BANK & PAYSTACK PAYOUTS */}
          {activeTab === "bank" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Payout Bank Details
                  </h2>
                  <p className="text-xs text-slate-500">
                    Connected to Paystack for automated vendor revenue
                    settlements.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-emerald-200">
                  Paystack Verified
                </span>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-amber-900 text-xs leading-relaxed flex gap-3 items-center">
                <svg
                  className="w-5 h-5 text-amber-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  <strong>Name Validation Strictness:</strong> Account Holder
                  Name must match your registered personal name (
                  <strong>
                    {user?.firstName} {user?.lastName}
                  </strong>
                  ) for Paystack compliance.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Bank Name
                  </label>
                  <select
                    name="bankName"
                    value={user?.bankName}
                    // onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all font-medium"
                  >
                    {NIGERIAN_BANKS.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    NUBAN Account Number
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    name="accountNumber"
                    value={user?.accountNumber}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Account Holder Name (Auto-Synced)
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    readOnly
                    value={user?.accountName}
                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm font-semibold cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & PASSWORD */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Security Credentials
                </h2>
                <p className="text-xs text-slate-500">
                  Update your access credentials and authentication protection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SAVE BUTTON BAR */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Changes apply instantly across Vexa.
            </span>
            <button
              type="submit"
              //   disabled={isSaving}
              disabled={true}
              className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all active:scale-[0.98] flex items-center gap-2"
            >
              {/* {isSaving ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Profile Changes"
              )} */}
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL POPUP */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 text-center space-y-4 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border-2 border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <svg
                className="w-8 h-8 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Profile Updated!
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Your vendor details and settings have been saved successfully to
                Vexa.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-emerald-600/20 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVendorProfile;
