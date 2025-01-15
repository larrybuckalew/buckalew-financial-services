import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Reset Password - Buckalew Financial Services',
  description: 'Reset your Buckalew Financial Services account password'
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-2 text-gray-600">
            Enter your email to receive a password reset link
          </p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password? {' '}
            <Link 
              href="/auth/login" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
