/**
 * Constantes de estilos Tailwind reutilizables
 * Principio: DRY - Un solo lugar para estilos repetidos
 */

// ============ ESTILOS DE INPUT ============

export const INPUT_STYLES = {
  yellow: "bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400",
  yellowForm: "bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400 text-gray-800 placeholder-gray-500",
  gray: "bg-gray-50 border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400",
};

// ============ ESTILOS DE LABEL ============

export const LABEL_STYLES = {
  dark: "text-gray-800",
  light: "text-white",
};

// ============ ESTILOS DE CARD ============

export const CARD_STYLES = {
  yellow: "bg-[#F9DC6B] text-[#251264] rounded-[40px] shadow-[0_18px_40px_rgba(0,0,0,0.12)]",
  white: "bg-white rounded-3xl shadow-2xl",
  yellowGradient: "bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-3xl shadow-xl",
};

// ============ ESTILOS DE BADGE ============

export const BADGE_STYLES = {
  yellow: "bg-[#FBE7A1] rounded-full px-5 py-3 text-center",
  yellowSmall: "bg-[#FBE7A1] rounded-full w-[90px] py-2 text-center",
};

// ============ ESTILOS DE BOTÓN ============

export const BUTTON_STYLES = {
  roundedFull: "rounded-full",
  roundedCustom: "rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl",
  yellowPrimary: "bg-yellow-400 hover:bg-yellow-500 text-[#251264]",
  outline: "border-2 border-[#251264] text-[#251264] hover:bg-[#251264] hover:text-white",
};

// ============ COLORES DE MARCA ============

export const BRAND_COLORS = {
  primary: "#1A125C",
  secondary: "#251264",
  yellow: "#F9DC6B",
  yellowLight: "#FBE7A1",
  yellowDark: "#F1C927",
  gradient: "linear-gradient(90deg, #FFCD00 0%, #FA5E60 100%)",
  gradientPink: "linear-gradient(90deg, #FFCD00 0%, #FA5E60 79%)",
};

// ============ TAMAÑOS DE CHILD CARD ============

export const CHILD_CARD_SIZE = {
  width: "w-[350px]",
  height: "h-[460px]",
  full: "w-[350px] h-[460px]",
};
