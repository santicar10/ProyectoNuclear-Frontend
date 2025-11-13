import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@components/common/Navbar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Huahuacuna",
  description: "Cambia una vida con un solo gesto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar visible en todas las páginas */}
        <Navbar />

        {/* Contenido principal */}
        {children}
      </body>
    </html>
  );
}