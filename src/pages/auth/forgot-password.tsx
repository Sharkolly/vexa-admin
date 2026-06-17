import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center max-md:w-[91%] max-md:mx-auto max-md:my-8">
      <main className="w-full min-h-screen flex flex-col md:flex-row max-md:w-[91%] max-md:mx-auto ">
        <section className="grow flex items-center justify-center px-margin-mobile py-stack-lg ">
          <div className="w-full max-w-150  max-xl:w-[91%] max-lg:mx-auto">
            <div className="bg-white rounded-xl  p-stack-lg ">
              <div className="text-center space-y-stack-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-fixed mb-4">
                  <span
                    className="material-symbols-outlined text-primary"
                    data-icon="lock_reset"
                  >
                    lock_reset
                  </span>
                </div>
                <h1 className="font-bold text-3xl text-slate-900 mb-4">
                  Forgot password?
                </h1>
                <p className=" text-slate-500 max-w-[320px] mb-6 mx-auto">
                  Enter your email to receive a password reset link.
                </p>
              </div>
              <form className="space-y-2">
                <div className="space-y-1">
                  <label className="font-medium  text-slate-700  pb-5">
                    Email address
                  </label>
                  <div className="relative group  mt-2 mb-4">
                    <input
                      className="w-full h-12 px-4 rounded-lg border border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 font-body-md text-body-md placeholder:text-slate-400"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      type="email"
                    />
                  </div>
                </div>
                <button
                  className="w-full h-12 bg-nav-blue-active text-white font-medium text-label-md rounded-lg shadow-lg shadow-indigo-200/50 hover:bg-primary-container active:scale-[0.98] transition-all duration-200 cursor-pointer"
                  type="submit"
                >
                  Send Reset Link
                </button>
              </form>
              <div className="text-center  py-3 my-5 ">
                <Link
                  className="inline-flex items-center gap-2 font-medium text-label-md text-slate-800 hover:text-primary transition-colors group"
                  to="/login"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="arrow_back"
                  >
                    {/* arrow_back */}
                  </span>
                  Back to Login
                </Link>
              </div>
            </div>
            <div className="mt-stack-lg opacity-40 grayscale pointer-events-none">
              <img
                alt="Technical abstract background"
                className="w-full h-32 object-cover rounded-xl mix-blend-multiply"
                data-alt="A clean, minimalist high-tech background featuring soft blue and white gradients with subtle geometric patterns. The aesthetic is modern corporate and high-end, evoking a sense of digital security and precision. The lighting is bright and airy, maintaining a light-mode editorial feel with a sophisticated electric indigo accent consistent with the Vexa brand identity."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn1y0MsfvLfBiHwWcvI84OWgt4QmYs8xfWMy-UIC9T7dMyzQ9_Bm-s073v1HV-4cC6HBZwPXok8qlwUCBykxmnq7j-gvu3hqf2LB7RETOrtxUa_k2NpZdtuYbU74cyooZIcO-V1EZ1PBfwnwT3S_4jnZGHgYtY8Vnyv2PcDeCiFgWATIfq-gAlHX3vA-115FyE5bJ2rYklUfLzJnnIiuL9GGXAhEfFBukE9j7_WcYdZ6OmQ1PvyqqFKokTZHafFprjD7hIQifg68k"
              />
            </div>
          </div>
        </section>

        <section className="hidden md:block md:w-1/2 relative overflow-hidden bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent z-10"></div>
          <img
            alt="Vexa E-commerce Brand Aesthetic"
            className="w-full h-full object-cover grayscale-[20%] brightness-75"
            data-alt="A cinematic, high-end lifestyle photograph showcasing a sleek, minimalist desk setup featuring premium obsidian-black tech accessories. The lighting is low-key and dramatic, with a sharp spotlight highlighting the metallic textures and clean industrial design of the hardware. The color palette is dominated by deep slates and blacks, with a subtle glow of electric indigo light reflecting off the glass surfaces. The overall mood is sophisticated, professional, and captures the essence of technical excellence and luxury design."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVjVDjWhJ4fImfYTNwy6SKiZzHlfTkIQ9dmljvUV1RKiVuuB2gpfDlMAbqROe_C0wYukgPd5DIJE3du8OJumD_tfuB9tHZNwQv65Z8FSlATBO-UiTbcoUz8S_vH8KkpmPDYb7_1_d500cAypfq7DHrYoX6v1wpmMm3A4D6m9AF8GMugEKKWDYsxxanh6bhe0XRFoQnjW6as9Khg1BCgGgFVOQ681RJEvivAwvEK3d9U0XxY5tkA89Tmy58YleR4JWmXdMEWC1lxvs"
          />
          <div className="absolute bottom-margin-desktop left-margin-desktop right-margin-desktop z-20 text-white max-w-lg">
            <blockquote className="font-display-xl text-display-xl tracking-tighter leading-tight">
              "Precision in every detail, luxury in every interaction."
            </blockquote>
            <div className="mt-stack-lg flex items-center gap-gutter">
              {" "}
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-surface-container-high overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Close up portrait of a professional male designer in a minimalist studio setting, soft natural lighting."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8T5O5yOlYOP_52Odh-Otz-cDXUIZdrztngY0q_ITKeDddEA3v4naXmp44rj4RrwKbRBt61uXYxNIoYmAfeMHUP3IhrDQlC0PaUYCA44hpcwQCDfKEmsk4vyo3BxfaM9XmdkfCQKldsHNg3d7mFkWOryktJzCq_0MC9Ya2umhwMwSySz1JoVJgo1OE54Xq_tAxO1DCp59n1adepIr8LJhh0Nr59FjDnr3V5PlGDClBT4bJHIzopbY_ZLPcy2nHzAn3AGUaiqFU320"
                  />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-surface-container-high overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Close up portrait of a professional female executive, sharp studio lighting, high fashion aesthetic."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOiwC3c_Y9RKT6EXnQh5hnPJo1ASSJVWsv9wH4yyVkgMhRxsQFyXijJzVduY3y0W0yFypMrZwr8ig5BqizF_UJy-56Ei-vpuK840ohuzc_00hypfpGdyureaR8p8geR9BclMMmVG6BccgpYxY9acSz50uc0-02EqiVMTo9bzN1V7z6OT7AZvqNCthSNDX0eGDD5OdL_KHYJtlzV9li5usb-uoPCzWbHjfU172RkfR-aOCwbFE3_UTo0iApyNklSGN_jxmhNlUgiPE"
                  />
                </div>
              </div>
              <p className="font-label-md text-label-md opacity-80">
                Joined by over 50,000+ creators and professionals worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ForgotPassword;
