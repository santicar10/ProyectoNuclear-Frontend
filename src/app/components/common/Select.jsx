export default function Select({ 
  label, 
  options = [],
  error,
  className = "",
  labelClassName = "",
  selectClassName = "",
  ...props 
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`block text-xs sm:text-sm font-medium mb-2 ${labelClassName}`}>
          {label}
        </label>
      )}
      
      <select
        className={`
          w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border 
          focus:outline-none focus:ring-2 transition-all
          ${selectClassName}
        `}
        {...props}
      >
        <option value="">Seleccionar...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}