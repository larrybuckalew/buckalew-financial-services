import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Buckalew Financial Services</h1>
        <p className="text-xl mb-8">Your trusted partner in financial planning and investment management</p>
        <div className="space-x-4">
          <Link href="/services" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Our Services
          </Link>
          <Link href="/contact" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}