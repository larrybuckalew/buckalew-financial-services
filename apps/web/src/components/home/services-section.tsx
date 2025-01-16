import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    title: 'Financial Planning',
    description: 'Comprehensive financial planning tailored to your goals and future aspirations.',
    icon: '💳',
    href: '/services/financial-planning'
  },
  {
    title: 'Medicare Solutions',
    description: 'Expert guidance through Medicare options to find the right coverage for you.',
    icon: '🏥',
    href: '/services/medicare'
  },
  {
    title: 'Insurance Services',
    description: 'Protect what matters most with our comprehensive insurance solutions.',
    icon: '🔐',
    href: '/services/insurance'
  }
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto">
            We offer a comprehensive range of financial services to help you achieve
            your financial goals and secure your future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary/80 mb-6">{service.description}</p>
                <Button asChild variant="outline">
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
