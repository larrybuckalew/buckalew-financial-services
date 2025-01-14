import React, { useState, ReactNode } from "react";
import Link from "next/link";
import { Menu, X, User, Phone, Mail, Facebook, Twitter, LinkedIn, ChevronDown } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navItems = [
    {
      name: "Services",
      dropdownItems: [
        { name: "Financial Planning", href: "/services/financial-planning" },
        { name: "Retirement Planning", href: "/services/retirement" },
        { name: "Investment Management", href: "/services/investment-management" },
        { name: "Insurance Solutions", href: "/services/insurance-solutions" }
      ]
    },
    { name: "Calculators", href: "/calculators" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Layout content remains the same */}
    </div>
  );
};

export default Layout;