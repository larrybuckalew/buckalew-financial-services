import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Menu, X, User, Phone, Mail, Facebook, Twitter, LinkedIn, ChevronDown } from 'lucide-react';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);

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

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Full layout content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;