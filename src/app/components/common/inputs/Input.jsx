/**
 * Campo de entrada con soporte para iconos, validación y toggle de contraseña
 * Versión responsive mejorada con fix para doble icono de contraseña
 * 
 * @component
 */
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
          // ✅ Deshabilitar el botón nativo del navegador
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
            {showPassword ? (
              // Ojo abierto
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              // Ojo cerrado
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* CSS para ocultar los controles nativos del navegador */}
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