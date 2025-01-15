
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import './globals.css'
import useTheme from './hooks/useTheme'

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['500', '600'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'Buckalew Financial Services',
  description: 'Professional financial planning and wealth management',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Buckalew Financial Services',
    description: 'Professional financial planning and wealth management',
    url: 'https://www.buckalew-financial.com',
    siteName: 'Buckalew Financial Services',
    images: [
      { url: '/brand/og-image.png', width: 1200, height: 630, alt: 'Buckalew Financial Services' }
    ],
    locale: 'en-US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buckalew Financial Services',
    description: 'Professional financial planning and wealth management',
    images: ['/brand/twitter-image.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()

  return (
    // Rest of the layout content
  )
}
