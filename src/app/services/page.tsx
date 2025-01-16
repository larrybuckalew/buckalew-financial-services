import { type Metadata } from 'next'
import { ServicesOverview } from '@/components/services/services-overview'
import { ServiceFeatures } from '@/components/services/service-features'

export const metadata: Metadata = {
  title: 'Our Services'
}

export default function ServicesPage() {
  return (
    <>
      <ServicesOverview />
      <ServiceFeatures />
    </>
  )
}
