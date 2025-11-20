"use client";
import DotacionForm from "@/app/components/common/forms/DotacionForm";
import PageHeader from "@components/common/PageHeader";

export default function DotacionPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      <PageHeader 
        title="¿Quieres donar?" 
        imageSrc="/family.svg"
        imageAlt="Dotación"
      />

      <div className="w-full max-w-4xl px-6 py-10">
        <DotacionForm />
      </div>
    </main>
  );
}