export default function Textarea({ 
  label, 
  error,
  className = "",
  labelClassName = "",
  textareaClassName = "",
  rows = 4,
  ...props 
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`block text-xs sm:text-sm font-medium mb-2 ${labelClassName}`}>
          {label}
        </label>
      )}
      
      <textarea
        rows={rows}
        className={`
          w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border 
          focus:outline-none focus:ring-2 transition-all resize-none
          ${textareaClassName}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}