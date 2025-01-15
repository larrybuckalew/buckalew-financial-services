import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-16 bg-accent-1/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-primary">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-lg text-primary/80">
            Schedule a free consultation with our expert advisors and take the first
            step towards achieving your financial goals.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
