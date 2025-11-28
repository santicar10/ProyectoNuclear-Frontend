/**
 * Componente de estado de error reutilizable
 * Principio: DRY - Un solo componente para todos los estados de error
 */

import Button from './Button';

export default function ErrorState({ 
  message = "Ha ocurrido un error",
  onRetry,
  retryText = "Reintentar",
  fullScreen = true,
  className = ""
}) {
  const containerClass = fullScreen 
    ? "min-h-screen bg-gray-50 flex items-center justify-center pt-24"
    : "flex items-center justify-center py-12";

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="warning"
            className="rounded-full"
          >
            {retryText}
          </Button>
        )}
      </div>
    </div>
  );
}
