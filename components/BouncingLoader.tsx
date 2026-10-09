const BouncingLoader = () => {
  const dots = [
    { bg: "bg-emerald-600", shadow: "shadow-emerald-600/40" },
    { bg: "bg-emerald-500", shadow: "shadow-emerald-500/40" },
    { bg: "bg-emerald-400", shadow: "shadow-emerald-400/40" },
    { bg: "bg-teal-400",    shadow: "shadow-teal-400/40" },
    { bg: "bg-cyan-400",    shadow: "shadow-cyan-400/40" },
  ];

  return (
    <div className="flex items-center justify-center space-x-2.5 h-20">
      {dots.map((dot, index) => (
        <span
          key={index}
          className={`w-3.5 h-3.5 rounded-full ${dot.bg} shadow-md ${dot.shadow} animate-bounce`}
          style={{
            animationDelay: `${index * 0.12}s`,
            animationDuration: "0.85s",
          }}
        />
      ))}
    </div>
  );
};

export default BouncingLoader;
