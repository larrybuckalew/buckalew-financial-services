import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-accent-2/10 to-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary leading-tight">
              Your Trusted Partner in Financial Success
            </h1>
            <p className="text-lg text-primary/80">
              Expert guidance in financial planning, Medicare, and insurance solutions
              tailored to your unique needs and goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/images/hero-illustration.svg"
              alt="Financial Planning Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
