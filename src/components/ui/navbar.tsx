import { siteConfig } from '@/config/site'
import Link from 'next/link'
import Image from 'next/image'

export function Navbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.svg"
              alt="Buckalew Financial Services"
              width={180}
              height={40}
              priority
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link font-medium"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/contact" className="btn-primary">
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
