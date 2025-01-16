import React from 'react';
import { 
  PieChart, 
  Target, 
  Shield, 
  LineChart, 
  DollarSign, 
  Umbrella, 
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      icon: PieChart,
      title: 'Financial Planning',
      description: 'Comprehensive strategies tailored to your unique financial goals.',
      href: '/services/financial-planning',
      color: 'blue'
    },
    // Rest of the services array
  ];

  return (
    <div>
      {/* Rest of the component content */}
    </div>
  );
}