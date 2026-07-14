const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-5 w-5",
  lg: "h-8 w-8",
};

export const Spinner = ({ size = "md", className = "" }) => {
  return (
    <div className={`relative inline-block ${sizeClasses[size]} ${className}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="spinner-blade" />
      ))}
    </div>
  );
};