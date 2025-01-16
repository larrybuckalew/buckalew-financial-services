import Link from 'next/link'

export default function NavigationMenu() {
  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/dashboard', label: 'Dashboard' }
  ]

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Buckalew Financial
        </Link>
        <ul className="flex space-x-4">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className="hover:text-blue-200 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}