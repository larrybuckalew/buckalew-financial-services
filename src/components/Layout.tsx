import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Menu, X, User, Phone, Mail, Facebook, Twitter, LinkedIn, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navItems = [
    {
      name: 'Services',
      dropdownItems: [
        { name: 'Financial Planning', href: '/services/financial-planning' },
        { name: 'Retirement Planning', href: '/services/retirement' },
        { name: 'Investment Management', href: '/services/investment-management' },
        { name: 'Insurance Solutions', href: '/services/insurance-solutions' }
      ]
    },
    { name: 'Calculators', href: '/calculators' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Layout content */}
      <main>{children}</main>
    </div>
  );
}