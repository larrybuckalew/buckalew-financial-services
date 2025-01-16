import { type Metadata } from 'next'
import { HeroSection } from '@/components/home/hero-section'
import { ServicesSection } from '@/components/home/services-section'
import { CTASection } from '@/components/home/cta-section'

export const metadata: Metadata = {
  title: 'Home'
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CTASection />
    </>
  )
}
