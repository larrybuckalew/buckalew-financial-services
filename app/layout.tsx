import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SeoMetaGenerator } from '../lib/seo/meta-generator'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = SeoMetaGenerator.forPage('home')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}