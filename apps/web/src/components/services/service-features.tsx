import { Heading } from '@/components/ui/heading'

const features = [
  {
    title: 'Personalized Approach',
    description: 'We create tailored solutions that align with your unique financial goals and circumstances.',
    icon: '🌟'
  },
  {
    title: 'Expert Guidance',
    description: 'Our team of experienced professionals provides knowledgeable advice you can trust.',
    icon: '💼'
  },
  {
    title: 'Comprehensive Solutions',
    description: 'From retirement planning to insurance, we offer all the services you need under one roof.',
    icon: '🌐'
  },
  {
    title: 'Client Education',
    description: 'We believe in empowering our clients with knowledge to make informed financial decisions.',
    icon: '📚'
  }
]

export function ServiceFeatures() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Heading size="xl" className="mb-4">
            Why Choose Us
          </Heading>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto">
            Experience the Buckalew Financial Services difference with our
            client-focused approach and comprehensive financial solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-lg bg-accent-2/5 hover:bg-accent-2/10 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-primary/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
