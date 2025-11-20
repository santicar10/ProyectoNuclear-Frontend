"use client";
import DonationForm from "@/app/components/common/forms/DonationForm";
import PageHeader from "@components/common/PageHeader";

export default function DonacionesPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      <PageHeader 
        title="¿Quieres donar?" 
        imageSrc="/family.svg"
        imageAlt="Donaciones"
      />
    
      <div className="w-full max-w-4xl px-6 py-10">
        <DonationForm />
      </div>
    </main>
  );
}