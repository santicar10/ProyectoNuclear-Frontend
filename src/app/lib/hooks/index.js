/**
 * Re-exportar hooks desde lib/hooks para compatibilidad
 * Los hooks reales están en src/app/lib/hooks/
 */

export { useAuth, default as useAuthDefault } from '@/app/lib/hooks/useAuth';
export { useForm, default as useFormDefault } from '@/app/lib/hooks/useForm';
export { useService, default as useServiceDefault } from '@/app/lib/hooks/useService';
