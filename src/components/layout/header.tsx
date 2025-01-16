import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  return (
    <header className="w-full border-b bg-background">
      <nav className="container-page flex items-center justify-between" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Buckalew Financial Services</span>
            <Image
              className="h-12 w-auto"
              src="/images/logo.png"
              alt="BFS Logo"
              width={180}
              height={48}
              priority
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-primary hover:text-accent-1 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="btn-primary"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  )
}
