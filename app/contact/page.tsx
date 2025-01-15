
import { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'Contact Us - Buckalew Financial Services',
  description: 'Get in touch with our financial experts. Schedule a consultation or ask a question.'
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    optIn: false,
  })

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    service: false,
    message: false,
    optIn: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let hasErrors = false

    // Validate form data
    if (!formData.name.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: true }))
      hasErrors = true
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }))
      hasErrors = true
    }
    if (!formData.phone.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: true }))
      hasErrors = true
    }
    if (!formData.service) {
      setErrors((prevErrors) => ({ ...prevErrors, service: true }))
      hasErrors = true
    }
    if (!formData.message.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, message: true }))
      hasErrors = true
    }
    if (!formData.optIn) {
      setErrors((prevErrors) => ({ ...prevErrors, optIn: true }))
      hasErrors = true
    }

    if (!hasErrors) {
      // Handle form submission
      console.log('Form submitted:', formData)
      // You can add your server-side logic here to process the form data
    }
  }

  const validateEmail = (email: string) => {
    // Basic email validation
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-bfs-blue">Contact Us</h1>
            <p className="mt-6 text-xl text-bfs-blue">
              We're here to help you achieve your financial goals
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-bfs-blue mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-bfs-blue">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0 ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">Please enter your full name.</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-bfs-blue">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-bfs-blue">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">Please enter a phone number.</p>
                  )}
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-bfs-blue">
                    Interested Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0 ${errors.service ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a Service</option>
                    <option value="financial-planning">Financial Planning</option>
                    <option value="investment-management">Investment Management</option>
                    <option value="retirement-planning">Retirement Planning</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">Please select an interested service.</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-bfs-blue">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0 ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">Please enter your message.</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="optIn"
                      name="optIn"
                      checked={formData.optIn}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-bfs-green-0 focus:ring-bfs-green-0 border-gray-300 rounded"
                    />
                    <label htmlFor="optIn" className="ml-2 block text-sm text-bfs-blue">
                      I agree to receive email communications from Buckalew Financial Services. I understand I can unsubscribe at any time.
                    </label>
                  </div>
                  {errors.optIn && (
                    <p className="text-red-500 text-sm mt-1">Please agree to the opt-in to receive email communications.</p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-bfs-green-0 text-white rounded-md hover:bg-bfs-green-2"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-bfs-blue mb-8">Contact Information</h2>
              <div className="space-y-6 text-bfs-blue">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Office Address</h3>
                  <p>123 Financial Street, Suite 400</p>
                  <p>Cityville, State 54321</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p>(555) 123-4567</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p>contact@buckalew-financial.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: By Appointment</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-bfs-blue text-center mb-8">
            Find Us
          </h2>
          {/* Placeholder for Google Maps integration */}
          <div className="bg-gray-200 h-96 flex items-center justify-center">
            <p className="text-bfs-blue">Google Maps Integration</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bfs-green-0 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Schedule a Free Consultation
          </h2>
          <p className="mt-4 text-xl text-bfs-green-1">
            Talk to a financial advisor about your goals today
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-bfs-green-0 rounded-md hover:bg-bfs-green-1">
            Book Appointment
          </button>
        </div>
      </section>
    </main>
  )
}
