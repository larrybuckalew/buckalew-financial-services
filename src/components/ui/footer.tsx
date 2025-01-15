import { siteConfig } from '@/config/site'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">About Us</h3>
            <p className="text-sm text-primary/80">
              Buckalew Financial Services provides expert financial planning, Medicare,
              and insurance solutions tailored to your needs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm nav-link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/financial-planning" className="text-sm nav-link">
                  Financial Planning
                </Link>
              </li>
              <li>
                <Link href="/services/medicare" className="text-sm nav-link">
                  Medicare Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/insurance" className="text-sm nav-link">
                  Insurance Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-primary/80">
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@buckalewfinancial.com</li>
              <li>Address: 123 Financial Street</li>
              <li>Suite 100</li>
              <li>City, ST 12345</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-primary/60">
          © {new Date().getFullYear()} Buckalew Financial Services. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
