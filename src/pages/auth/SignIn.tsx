import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import API from "../../../api/api";
import { useAuthContextStore } from "../../../store/useAuthContext";

const SignIn = () => {
  const { emailOnChange, passwordOnChange, email, password } =
    useAuthContextStore();

  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  // Clear timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    setMessage("");
    setIsError(false);

    try {
      const { data } = await API.post(
        "/admin/login",
        { email, password },
        { withCredentials: true }
      );

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      setMessage(data?.message || "Login successful! Redirecting...");
      setIsError(false);

      // Smooth redirection delay
      timerRef.current = setTimeout(() => {
        navigate("/product-form");
      }, 1200);
    } catch (error: unknown) {
      const err = error as AxiosError<{
        message: string;
        status: boolean;
        type?: string;
      }>;

      setIsError(true);
      setMessage(
        err.response?.data?.message ||
          "Authentication failed. Please check your credentials."
      );

      timerRef.current = setTimeout(() => {
        setMessage("");
        setIsError(false);
      }, 6000);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans antialiased text-slate-900 selection:bg-slate-900 selection:text-white">
      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12">
        {/* Left Form Panel */}
        <section className="lg:col-span-7 xl:col-span-6 flex items-center justify-center p-6 sm:p-12 lg:p-16">
          <div className="w-full max-w-md space-y-8">
            {/* Header / Brand */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10">
                  <svg
                    className="w-5 h-5 text-white fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8Messz" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-black tracking-widest text-slate-900 uppercase block">
                    VEXA
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block -mt-1">
                    Vendor Portal
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Manage your inventory, orders, and business analytics from your
                central command center.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={submitForm}>
              {/* Work Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-700 block"
                >
                  Work Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={emailOnChange}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all outline-none font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-slate-700 block"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={passwordOnChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all outline-none font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.962 8.962 0 012.28-.23c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-9 9 0 00-9-9" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 transition-all cursor-pointer"
                  />
                  <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-slate-900 hover:underline underline-offset-2"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isFetching}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-lg shadow-slate-900/10 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isFetching && (
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {isFetching ? "Authenticating..." : "Sign In to Portal"}
                </button>

                {/* Status Message Banners */}
                {message && (
                  <div
                    className={`mt-4 p-3.5 rounded-xl border text-xs font-semibold text-center flex items-center justify-center gap-2 ${
                      isError
                        ? "bg-rose-50 border-rose-200 text-rose-700"
                        : "bg-emerald-50 border-emerald-200 text-emerald-800"
                    }`}
                  >
                    {isError ? (
                      <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {message}
                  </div>
                )}
              </div>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="w-full border-t border-slate-200" />
              <span className="bg-slate-50/50 px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase absolute">
                Or
              </span>
            </div>

            {/* Customer SignUp Link */}
            <Link to="/signup" className="block">
              <button
                type="button"
                className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              >
                Create Customer Account
              </button>
            </Link>

            {/* Partnership Redirect Footer */}
            <p className="text-center text-xs text-slate-500 pt-2">
              New to the portal?{" "}
              <a
                href="https://wa.me/2347035439642"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-slate-900 hover:underline underline-offset-2 ml-0.5"
              >
                Apply for Partnership
              </a>
            </p>
          </div>
        </section>

        {/* Right Hero Panel */}
        <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-6 flex-col justify-between p-12 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0 opacity-60 mix-blend-luminosity">
            <img
              alt="Vendor Portal Headquarters"
              className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out hover:scale-100"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlX5On4x4Qf6bSzG6UgydOF8F2Se9Dfs4oQveAb_deyckakwjJu7yiwVI0ED8Hl8gizlueEz7PKhGySWm8W-VZ1OW3JqCVB17g5UBfyA36Y2WVtmBI6Ze8WQDjZx4praIaD6jdWguLglToK95gf5HFP95Ga69I5NU5YO79qowBFO_zzLGF53RPE2pVgUuZh-vEffT-PRaOjVBFCy5k1HNYknXnFa06ztqyr8CEy4YwpXPZShwGgVmxKAWbrYozwL0vcVX45cubq7c"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Pill Tag */}
          <div className="relative z-20 flex items-center gap-3">
            <span className="text-2xl font-black tracking-widest text-white uppercase">
              VEXA CORE
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-slate-300 uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/10">
              Enterprise
            </span>
          </div>

          {/* Bottom Elevated Overlay */}
          <div className="relative z-20 max-w-lg backdrop-blur-2xl bg-white/10 border border-white/15 p-8 rounded-3xl shadow-2xl">
            <p className="text-xs font-semibold tracking-widest text-slate-300 uppercase mb-2">
              Global Supply Intelligence
            </p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
              Precision supply chain management.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Real-time inventory sync, automated procurement, and predictive sales analytics in one unified dashboard.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignIn;