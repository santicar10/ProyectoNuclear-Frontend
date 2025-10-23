/**
 * Componente de botón reutilizable con múltiples variantes y estados
 * 
 * @component
 * @example
 * <Button variant="primary" onClick={handleClick} isLoading={loading}>
 *   Guardar
 * </Button>
 */
export default function Button({ 
  children, 
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = "right",
  className = "",
  ...props 
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-yellow-400 hover:bg-yellow-500 text-gray-900",
    outline: "border-2 border-gray-300 hover:bg-gray-50 text-gray-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`
        font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2
        flex items-center justify-center gap-2
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isLoading ? 'cursor-wait' : ''}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
              fill="none"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Cargando...
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
        </>
      )}
    </button>
  );
}