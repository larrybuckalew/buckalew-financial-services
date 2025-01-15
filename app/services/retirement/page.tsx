import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Retirement Planning - Buckalew Financial Services',
  description: 'Comprehensive retirement strategies to secure your financial future'
}

export default function RetirementPlanningPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Retirement Planning</h1>
            <p className="mt-6 text-xl text-gray-500">
              Crafting your path to a secure and fulfilling retirement
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
                Your Retirement, Your Way
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Retirement planning is more than just saving money—it's about designing 
                a lifestyle that reflects your dreams, values, and personal aspirations.
              </p>
              <p className="text-lg text-gray-600">
                We provide comprehensive strategies that consider every aspect of your 
                financial journey, ensuring you have the resources and confidence to 
                enjoy your retirement years to the fullest.
              </p>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Retirement Planning Elements:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Income Replacement Strategy',
                    '401(k) and IRA Optimization',
                    'Social Security Planning',
                    'Healthcare Cost Management',
                    'Tax-Efficient Withdrawal Strategies'
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

      {/* Retirement Stages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Retirement Planning Lifecycle</h2>
            <p className="mt-4 text-lg text-gray-600">
              Tailored strategies for every stage of your retirement journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Early Career Planning',
                description: 'Building a strong financial foundation and establishing savings habits.',
                icon: '🌱'
              },
              {
                title: 'Mid-Career Optimization',
                description: 'Maximizing contributions and refining investment strategies.',
                icon: '🚀'
              },
              {
                title: 'Pre-Retirement Preparation',
                description: 'Fine-tuning your plan and transitioning towards retirement.',
                icon: '🎯'
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

      {/* Retirement Income Sources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Comprehensive Retirement Income Planning</h2>
            <p className="mt-4 text-lg text-gray-600">
              Diversified strategies to generate sustainable retirement income
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Social Security Optimization',
                description: 'Strategic timing and claiming strategies to maximize benefits.',
                icon: '💼'
              },
              {
                title: 'Pension and 401(k) Management',
                description: 'Intelligent rollover and distribution planning.',
                icon: '📊'
              },
              {
                title: 'Investment Income Streams',
                description: 'Creating reliable passive income through diversified investments.',
                icon: '💰'
              }
            ].map((source) => (
              <div key={source.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-4">{source.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{source.title}</h3>
                <p className="text-gray-600">{source.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Secure Your Retirement Dream
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Schedule a personalized retirement consultation today
          </p>
          <Link 
            href="/contact"
            className="mt-8 inline-block px-8 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-md"
          >
            Plan Your Future
          </Link>
        </div>
      </section>
    </main>
  )
}
