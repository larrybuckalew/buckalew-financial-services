import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Estate Planning - Buckalew Financial Services',
  description: 'Comprehensive estate planning to preserve and transfer your legacy'
}

export default function EstatePlanningPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Estate Planning</h1>
            <p className="mt-6 text-xl text-gray-500">
              Preserving your legacy and protecting your family's future
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
                Your Legacy, Your Terms
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Estate planning is more than just distributing assets—it's about creating 
                a comprehensive strategy that reflects your values, protects your loved ones, 
                and ensures your wishes are honored.
              </p>
              <p className="text-lg text-gray-600">
                We work closely with you to develop a personalized estate plan that 
                minimizes tax implications and provides peace of mind for you and your family.
              </p>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Estate Planning Components:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Will Preparation',
                    'Trust Establishment',
                    'Asset Protection',
                    'Tax Minimization Strategies',
                    'Healthcare Directives'
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

      {/* Estate Planning Stages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Comprehensive Estate Planning Process</h2>
            <p className="mt-4 text-lg text-gray-600">
              A strategic approach to protecting your assets and loved ones
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Asset Inventory',
                description: 'Comprehensive review and documentation of your assets and liabilities.',
                icon: '📋'
              },
              {
                title: 'Strategy Development',
                description: 'Creating a personalized plan that aligns with your goals and values.',
                icon: '🎯'
              },
              {
                title: 'Legal Documentation',
                description: 'Preparing and executing legally binding estate planning documents.',
                icon: '⚖️'
              }
            ].map((stage) => (
              <div key={stage.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-4">{stage.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{stage.title}</h3>
                <p className="text-gray-600">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estate Planning Tools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Essential Estate Planning Tools</h2>
            <p className="mt-4 text-lg text-gray-600">
              Strategies to protect and transfer your wealth
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Revocable Living Trust',
                description: 'Flexible tool for asset management and probate avoidance.',
                icon: '🏦'
              },
              {
                title: 'Power of Attorney',
                description: 'Designating a trusted representative for financial decisions.',
                icon: '📝'
              },
              {
                title: 'Healthcare Proxy',
                description: 'Ensuring your medical wishes are respected.',
                icon: '🩺'
              }
            ].map((tool) => (
              <div key={tool.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Secure Your Family's Future
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Schedule a comprehensive estate planning consultation
          </p>
          <Link 
            href="/contact"
            className="mt-8 inline-block px-8 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-md"
          >
            Plan Your Legacy
          </Link>
        </div>
      </section>
    </main>
  )
}
