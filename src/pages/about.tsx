import React from 'react';
import { Award, Target, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Buckalew Financial</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are dedicated to helping you achieve financial success through personalized, comprehensive financial strategies.
            </p>
          </div>
        </div>
      </div>

      {/* Rest of the component content */}
    </div>
  );
}