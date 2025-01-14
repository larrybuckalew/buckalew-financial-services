export function Alert({ children, variant = "default" }) {
  const baseClasses = "p-4 rounded-lg";
  const variants = {
    default: "bg-blue-600/10 text-blue-400",
    destructive: "bg-red-600/10 text-red-400"
  };

  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children }) {
  return <div className="text-sm">{children}</div>;
}