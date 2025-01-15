import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Financial Planning - Buckalew Financial Services',
  description: 'Comprehensive financial planning tailored to your unique goals and circumstances'
}

export default function FinancialPlanningPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Financial Planning</h1>
            <p className="mt-6 text-xl text-gray-500">
              Strategic guidance to help you achieve your financial goals
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
                Your Personalized Financial Roadmap
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Financial planning is more than just managing money—it's about creating a comprehensive strategy 
                that aligns with your life goals, values, and aspirations.
              </p>
              <p className="text-lg text-gray-600">
                Our approach combines deep financial expertise with personalized attention, 
                ensuring that every aspect of your financial life is carefully considered and optimized.
              </p>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Comprehensive Planning Includes:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Retirement Strategy',
                    'Investment Portfolio Analysis',
                    'Risk Management',
                    'Tax Optimization',
                    'Estate Planning Coordination'
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

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Financial Planning Process</h2>
            <p className="mt-4 text-lg text-gray-600">
              A systematic approach to understanding and achieving your financial objectives
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Discovery',
                description: 'In-depth consultation to understand your current financial situation, goals, and dreams.',
                icon: '🔍'
              },
              {
                title: 'Analysis',
                description: 'Comprehensive review of your finances, identifying opportunities and potential risks.',
                icon: '📊'
              },
              {
                title: 'Strategy Development',
                description: 'Crafting a personalized financial plan tailored specifically to your unique needs.',
                icon: '🎯'
              }
            ].map((step) => (
              <div key={step.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Benefits of Our Financial Planning</h2>
            <p className="mt-4 text-lg text-gray-600">
              How we help you transform your financial future
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Clear Direction',
                description: 'Gain a crystal-clear understanding of your financial path and actionable steps.',
                icon: '🧭'
              },
              {
                title: 'Risk Mitigation',
                description: 'Proactively identify and minimize potential financial risks and vulnerabilities.',
                icon: '🛡️'
              },
              {
                title: 'Wealth Optimization',
                description: 'Maximize your wealth potential through strategic investment and tax planning.',
                icon: '💰'
              },
              {
                title: 'Retirement Readiness',
                description: 'Ensure a comfortable and secure retirement tailored to your lifestyle.',
                icon: '🌴'
              },
              {
                title: 'Ongoing Support',
                description: 'Continuous monitoring and adjustment of your financial strategy.',
                icon: '🤝'
              },
              {
                title: 'Peace of Mind',
                description: 'Confidence in your financial decisions and future security.',
                icon: '😌'
              }
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Take Control of Your Financial Future?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Schedule a free consultation and start your journey to financial success
          </p>
          <Link 
            href="/contact"
            className="mt-8 inline-block px-8 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-md"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </main>
  )
}
