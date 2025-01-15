import { type Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import '@/styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Buckalew Financial Services',
    default: 'Buckalew Financial Services - Your Trusted Financial Partner'
  },
  description: 'Expert financial planning, Medicare, and insurance solutions tailored to your needs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
