import { Heading } from '@/components/ui/heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const services = [
  {
    title: 'Financial Planning',
    description: 'Custom financial strategies aligned with your life goals.',
    features: [
      'Retirement planning',
      'Investment management',
      'Tax planning',
      'Estate planning'
    ],
    href: '/services/financial-planning'
  },
  {
    title: 'Medicare Solutions',
    description: 'Navigate Medicare options with expert guidance.',
    features: [
      'Medicare plan selection',
      'Supplement insurance',
      'Part D coverage',
      'Annual reviews'
    ],
    href: '/services/medicare'
  },
  {
    title: 'Insurance Services',
    description: 'Comprehensive protection for you and your family.',
    features: [
      'Life insurance',
      'Long-term care',
      'Disability insurance',
      'Health insurance'
    ],
    href: '/services/insurance'
  }
]

export function ServicesOverview() {
  return (
    <section className="py-16 bg-gradient-to-b from-accent-2/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Heading as="h1" size="2xl" className="mb-4">
            Our Services
          </Heading>
          <p className="text-lg text-primary/80">
            At Buckalew Financial Services, we offer comprehensive financial solutions
            tailored to your unique needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <p className="text-primary/80 mt-2">{service.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-accent-1 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link href={service.href}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
