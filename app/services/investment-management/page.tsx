import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Investment Management - Buckalew Financial Services',
  description: 'Professional investment strategies tailored to your financial goals and risk tolerance'
}

export default function InvestmentManagementPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Investment Management</h1>
            <p className="mt-6 text-xl text-gray-500">
              Strategic investment solutions designed to grow and protect your wealth
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
                Personalized Investment Strategies
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Our investment management goes beyond simple portfolio allocation. We create 
                comprehensive investment strategies that are meticulously crafted to align with 
                your unique financial objectives, risk tolerance, and life stage.
              </p>
              <p className="text-lg text-gray-600">
                Using a combination of data-driven analysis, market insights, and personalized 
                consulting, we help you navigate the complex world of investments with confidence.
              </p>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Our Investment Approach Covers:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Asset Allocation Strategy',
                    'Diversification Planning',
                    'Risk Management',
                    'Performance Tracking',
                    'Regular Portfolio Rebalancing'
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

      {/* Investment Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Investment Portfolio Options</h2>
            <p className="mt-4 text-lg text-gray-600">
              Tailored investment solutions for every financial goal
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Conservative Portfolio',
                description: 'Focused on capital preservation with lower-risk investments.',
                risk: 'Low Risk',
                icon: '🛡️'
              },
              {
                title: 'Balanced Portfolio',
                description: 'Balanced mix of growth and stability across asset classes.',
                risk: 'Medium Risk',
                icon: '⚖️'
              },
              {
                title: 'Growth Portfolio',
                description: 'Aggressive strategy targeting high-growth potential investments.',
                risk: 'High Risk',
                icon: '🚀'
              }
            ].map((portfolio) => (
              <div key={portfolio.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-4">{portfolio.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{portfolio.title}</h3>
                <p className="text-gray-600 mb-4">{portfolio.description}</p>
                <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full">
                  {portfolio.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Investment Management</h2>
            <p className="mt-4 text-lg text-gray-600">
              Expertise, technology, and personalized service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Advanced Analytics',
                description: 'Leverage cutting-edge tools and data-driven insights.',
                icon: '📊'
              },
              {
                title: 'Personalized Approach',
                description: 'Strategies uniquely tailored to your financial profile.',
                icon: '🎯'
              },
              {
                title: 'Transparent Reporting',
                description: 'Clear, comprehensive performance tracking and insights.',
                icon: '📈'
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
            Unlock Your Investment Potential
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Schedule a personalized investment consultation today
          </p>
          <Link 
            href="/contact"
            className="mt-8 inline-block px-8 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-md"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  )
}
