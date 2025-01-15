import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home'
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Buckalew Financial Services</h1>
      <p className="text-lg mb-4">
        Your trusted partner in financial planning, Medicare, and insurance solutions.
      </p>
    </div>
  )
}
