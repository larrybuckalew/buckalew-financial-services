import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Secure Your Financial Future
              </motion.h1>
              <p className="text-xl text-blue-100">
                Expert financial planning and wealth management services tailored to your goals.
              </p>
              <div className="flex space-x-4">
                <Link href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                  Get Started
                </Link>
                <Link href="/services" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="/images/hero-image.svg" alt="Financial Planning" className="w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
          <p className="text-xl mb-8">Schedule a free consultation with our experts today.</p>
          <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition">
            Schedule Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    title: 'Wealth Management',
    description: 'Comprehensive wealth management strategies tailored to your goals.',
    icon: '💰'
  },
  {
    title: 'Retirement Planning',
    description: 'Secure your future with expert retirement planning advice.',
    icon: '🎯'
  },
  {
    title: 'Investment Strategy',
    description: 'Data-driven investment strategies for optimal returns.',
    icon: '📈'
  }
];

const features = [
  {
    title: 'Expert Team',
    description: 'Certified financial advisors with decades of experience.',
    icon: '👥'
  },
  {
    title: 'Personalized Approach',
    description: 'Tailored solutions for your unique financial situation.',
    icon: '🎯'
  },
  {
    title: 'Advanced Technology',
    description: 'Cutting-edge tools for portfolio management and analysis.',
    icon: '💻'
  },
  {
    title: 'Transparent Fees',
    description: 'Clear, straightforward pricing with no hidden fees.',
    icon: '✓'
  }
];
