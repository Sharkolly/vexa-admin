import { useState, useEffect } from "react";

const BouncingLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate smooth incremental progress on mount
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment smoothly
        return prev + Math.floor(Math.random() * 6) + 3;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white p-4 mt-4 rounded-2xl shadow-s borde borde-slate-100 flex flex-col gap-3">
      <div className="flex justify-between  items-center text-xs font-medium text-slate-600">
        <span className=''>Loading...</span>
        <span className="text-emerald-700  font-semibold">
          {Math.min(progress, 100)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-200">
        <div
          className="bg-emerald-600 h-full rounded-full transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default BouncingLoader;
