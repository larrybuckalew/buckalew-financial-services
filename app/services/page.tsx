import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    { name: 'Financial Planning', href: '/services/financial-planning', description: 'Comprehensive financial strategy tailored to your goals' },
    { name: 'Investment Management', href: '/services/investment-management', description: 'Expert portfolio management and investment strategies' },
    { name: 'Retirement Planning', href: '/services/retirement-planning', description: 'Secure and comfortable retirement solutions' },
    { name: 'Insurance Services', href: '/services/insurance', description: 'Protective coverage for your financial future' },
    { name: 'Estate Planning', href: '/services/estate-planning', description: 'Preserving and transferring your wealth effectively' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.name} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <Link href={service.href} className="block">
              <h2 className="text-xl font-semibold mb-3">{service.name}</h2>
              <p className="text-gray-600">{service.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}