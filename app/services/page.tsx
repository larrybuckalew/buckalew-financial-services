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