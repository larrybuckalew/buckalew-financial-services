import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Buckalew Financial Services',
  description: 'Comprehensive financial planning and advisory services'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 8b23bf4b151ec0d55503841543412fcc0f36a232
