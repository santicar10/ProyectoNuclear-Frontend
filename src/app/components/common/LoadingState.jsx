/**
 * Componente de estado de carga reutilizable
 * Principio: DRY - Un solo componente para todos los estados de carga
 */

import { SpinnerIcon } from './Icons';

export default function LoadingState({ 
  message = "Cargando...",
  fullScreen = true,
  className = ""
}) {
  const containerClass = fullScreen 
    ? "min-h-screen bg-gray-50 flex items-center justify-center pt-24"
    : "flex items-center justify-center py-12";

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="text-center">
        <SpinnerIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <p className="text-gray-600 text-xl">{message}</p>
      </div>
    </div>
  );
}
