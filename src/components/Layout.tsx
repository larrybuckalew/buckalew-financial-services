import React, { useState } from "react";
import { Menu, X, User, Phone, Mail, Facebook, Twitter, LinkedIn, ChevronDown } from "lucide-react";

export default function Layout({ children }) {
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
      {/* Rest of the Layout component content */}
    </div>
  );
}