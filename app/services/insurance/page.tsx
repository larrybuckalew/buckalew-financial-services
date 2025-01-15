import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Insurance Solutions - Buckalew Financial Services',
  description: 'Comprehensive insurance strategies to protect your financial future'
}

export default function InsurancePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Insurance Solutions</h1>
            <p className="mt-6 text-xl text-gray-500">
              Protecting what matters most with tailored insurance strategies
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Comprehensive Protection for Your Lifestyle
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Insurance is more than a safety net—it's a critical component of a holistic 
                financial plan that provides peace of mind and financial security.
              </p>
              <p className="text-lg text-gray-600">
                We help you navigate the complex world of insurance, ensuring you have 
                the right coverage at the right price to protect your family and assets.
              </p>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Insurance Coverage We Specialize In:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Life Insurance',
                    'Health Insurance',
                    'Disability Insurance',
                    'Long-Term Care Insurance',
                    'Property and Casualty Insurance'
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Insurance Solutions Tailored to You</h2>
            <p className="mt-4 text-lg text-gray-600">
              Personalized protection for every stage of life
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Life Insurance',
                description: 'Protecting your family\'s financial future in any scenario.',
                icon: '🛡️'
              },
              {
                title: 'Disability Coverage',
                description: 'Income protection if you\'re unable to work due to illness or injury.',
                icon: '💼'
              },
              {
                title: 'Long-Term Care',
                description: 'Comprehensive coverage for potential healthcare needs.',
                icon: '🏥'
              }
            ].map((insurance) => (
              <div key={insurance.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-4">{insurance.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{insurance.title}</h3>
                <p className="text-gray-600">{insurance.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Assessment */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Comprehensive Risk Management</h2>
            <p className="mt-4 text-lg text-gray-600">
              Identifying and mitigating potential financial risks
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personalized Risk Analysis',
                description: 'Detailed assessment of your unique financial vulnerabilities.',
                icon: '🔍'
              },
              {
                title: 'Strategic Coverage',
                description: 'Tailored insurance solutions that match your specific needs.',
                icon: '📊'
              },
              {
                title: 'Ongoing Review',
                description: 'Regular updates to ensure your coverage evolves with your life.',
                icon: '🔄'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Protect What Matters Most
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Schedule a comprehensive insurance review today
          </p>
          <Link 
            href="/contact"
            className="mt-8 inline-block px-8 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-md"
          >
            Get Protected
          </Link>
        </div>
      </section>
    </main>
  )
}
