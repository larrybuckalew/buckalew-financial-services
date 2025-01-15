
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const HeroSection = dynamic(() => import('./components/HeroSection'), { suspense: true })
const ServicesPreviewSection = dynamic(() => import('./components/ServicesPreviewSection'), { suspense: true })
const WhyChooseUsSection = dynamic(() => import('./components/WhyChooseUsSection'), { suspense: true })
const CTASection = dynamic(() => import('./components/CTASection'), { suspense: true })

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <ServicesPreviewSection />
        <WhyChooseUsSection />
        <CTASection />
      </Suspense>
    </main>
  )
}
