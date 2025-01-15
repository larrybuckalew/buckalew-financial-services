import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Buckalew Financial Services',
  description: 'Learn about our team and our commitment to your financial success',
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
            <p className="mt-6 text-xl text-gray-500">
              Dedicated to helping you achieve your financial goals through personalized,
              comprehensive strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Our Story</h2>
            <p className="mt-6 text-lg text-gray-600">
              For over [X] years, Buckalew Financial Services has been helping individuals
              and families achieve their financial goals. Our commitment to personalized
              service and comprehensive financial planning has made us a trusted partner
              in our clients' financial journeys.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              We believe in building long-term relationships with our clients, understanding
              their unique needs, and creating strategies that evolve with them over time.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Values</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Integrity',
                description: 'We always put our clients' interests first and maintain the highest ethical standards.'
              },
              {
                title: 'Excellence',
                description: 'We strive to deliver exceptional service and results in everything we do.'
              },
              {
                title: 'Innovation',
                description: 'We constantly adapt and evolve to meet our clients' changing needs.'
              }
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet the experienced professionals dedicated to your success
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Add team member cards here */}
          </div>
        </div>
      </section>
    </main>
  )
}