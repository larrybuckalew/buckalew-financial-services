<<<<<<< HEAD

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
=======
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Buckalew Financial Services</h1>
        <p className="text-xl">Your trusted partner in financial planning</p>
      </div>
    </main>
  )
}
>>>>>>> 8b23bf4b151ec0d55503841543412fcc0f36a232
