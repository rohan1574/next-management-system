"use client";

import { useState } from 'react';

interface DashoardProps {
  onToggleForm: () => void;
  productCount: number;
}

const Dashoard = ({ onToggleForm, productCount }: DashoardProps) => {
  return (
    <div className="flex justify-between mb-8">
      <div>
        {/* Information section */}
        <p>Information</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <h1>Staff</h1>
        <div>
          <button 
            onClick={onToggleForm} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Products
          </button>
          <h1 className="text-xl font-semibold">{productCount}</h1>
        </div>
        <h1>Staff</h1>
      </div>
    </div>
  );
};

export default Dashoard;
