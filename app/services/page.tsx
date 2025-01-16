<<<<<<< HEAD

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Services - Buckalew Financial Services',
  description: 'Explore our comprehensive financial services and solutions'
}

const services = [
  {
    title: 'Financial Planning',
    description: 'Comprehensive financial planning tailored to your goals and circumstances.',
    link: '/services/financial-planning'
  },
  {
    title: 'Investment Management',
    description: 'Professional portfolio management aligned with your investment objectives.',
    link: '/services/investment-management'
  },
  {
    title: 'Retirement Planning',
    description: 'Strategic planning for a secure and comfortable retirement.',
    link: '/services/retirement-planning'
  },
  {
    title: 'Insurance Solutions',
    description: 'Protection strategies to secure your family's financial future.',
    link: '/services/insurance'
  },
  {
    title: 'Estate Planning',
    description: 'Preserve and transfer your wealth according to your wishes.',
    link: '/services/estate-planning'
  }
]

export default function ServicesPage() {
  return (
    // Services page UI
  )
}
=======
export default function ServicesPage() {
  const services = [
    { name: 'Financial Planning', description: 'Comprehensive financial strategy' },
    { name: 'Investment Management', description: 'Expert portfolio management' },
    { name: 'Retirement Planning', description: 'Secure retirement solutions' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.name} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">{service.name}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
>>>>>>> 8b23bf4b151ec0d55503841543412fcc0f36a232
