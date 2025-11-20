import { EyeOpenIcon, EyeClosedIcon } from '../icons';

export default function Input({ 
  label, 
  type = "text", 
  error,
  icon: Icon,
  showPasswordToggle = false,
  onTogglePassword,
  showPassword,
  className = "",
  labelClassName = "",
  inputClassName = "",
  ...props 
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`block text-xs sm:text-sm font-medium mb-2 ${labelClassName}`}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        )}
        
        <input
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          className={`
            w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border 
            focus:outline-none focus:ring-2 transition-all
            ${Icon ? 'pl-9 sm:pl-10' : ''} 
            ${showPasswordToggle ? 'pr-10 sm:pr-12' : ''}
            ${inputClassName}
          `}
          autoComplete={showPasswordToggle ? "current-password" : props.autoComplete}
          data-lpignore="true"
          data-form-type="other"
          {...props}
        />
        
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity z-10"
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <style jsx>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear,
        input[type="password"]::-webkit-contacts-auto-fill-button,
        input[type="password"]::-webkit-credentials-auto-fill-button {
          display: none !important;
          pointer-events: none;
          visibility: hidden;
        }
      `}</style>
    </div>
  );
}