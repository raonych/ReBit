"use client";
import React from 'react';
import ButtonColumn from '@/lib/components/portalVendedor/conversas';
import DataDisplay from '@/lib/components/portalVendedor/produtos';
import SecondaryDataDisplay from '@/lib/components/portalVendedor/avaliacoes';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <ButtonColumn onButtonClick={(id) => console.log(`Button ${id} clicked`)} />
          <DataDisplay />
          <SecondaryDataDisplay />
        </div>
      </main>
    </div>
  );
}

export default App;