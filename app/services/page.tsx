
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Services - Buckalew Financial Services',
  description: 'Explore our comprehensive financial services and solutions'
}

const services = [
  {
    title: 'Financial Planning',
    description: 'Comprehensive financial planning tailored to your goals and circumstances.',
    link: '/services/financial-planning'
  },
  {
    title: 'Investment Management',
    description: 'Professional portfolio management aligned with your investment objectives.',
    link: '/services/investment-management'
  },
  {
    title: 'Retirement Planning',
    description: 'Strategic planning for a secure and comfortable retirement.',
    link: '/services/retirement-planning'
  },
  {
    title: 'Insurance Solutions',
    description: 'Protection strategies to secure your family's financial future.',
    link: '/services/insurance'
  },
  {
    title: 'Estate Planning',
    description: 'Preserve and transfer your wealth according to your wishes.',
    link: '/services/estate-planning'
  }
]

export default function ServicesPage() {
  return (
    // Services page UI
  )
}
