import React from 'react';
import { ArrowRight, PiggyBank, DollarSign, BarChart, Briefcase, Heart, Home } from 'lucide-react';

export default function RetirementPlanningPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-800 h-[400px]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src="/api/placeholder/1920/400" 
            alt="Retirement Planning"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Retirement Planning</h1>
            <p className="text-xl text-blue-100">
              Secure your future with expert retirement planning strategies
            </p>
          </div>
        </div>
      </div>

      {/* Rest of the component content */}
    </div>
  );
}