export default function Card({ 
  children, 
  className = "",
  padding = "default",
  shadow = "default"
}) {
  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
    xl: "p-12"
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    default: "shadow-lg",
    lg: "shadow-xl",
    xl: "shadow-2xl"
  };

  return (
    <div className={`bg-white rounded-xl ${shadows[shadow]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}