// import React, { useEffect, type Dispatch, type SetStateAction } from "react";
import React, { useEffect } from "react";

interface FeedbackModalProps {
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  autoCloseMs?: number;
  showSuccess?: boolean;
  //   setShowSuccess?: Dispatch<SetStateAction<string | boolean>>;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  onClose,
  title = "Action Successful!",
  message = "Your changes have been saved successfully.",
  buttonText = "Continue",
  autoCloseMs,
  showSuccess,
  //   setShowSuccess
}) => {
  useEffect(() => {
    if (autoCloseMs) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseMs);
      return () => clearTimeout(timer);
    }
  }, [autoCloseMs, onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/10 backdrop-blur-xs transition-all"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {showSuccess === true ? (
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
        ) : (
          <div className="w-16 h-16 bg-rose-100 text-rose-600 border-2 border-rose-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg
              className="w-8 h-8 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
          <p className="text-sm text- text-slate-500 leading-relaxed">{message}</p>
        </div>

        <button
          type="button"
        //   onClick={onClose}
         
          className={`w-full py-3 px-4  text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] ${
            showSuccess
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-rose-600 hover:bg-rose-700"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
