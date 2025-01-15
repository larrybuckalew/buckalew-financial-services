
import { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'Register - Buckalew Financial Services',
  description: 'Create your Buckalew Financial Services account'
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  })

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    termsAccepted: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let hasErrors = false

    // Validate form data
    if (!formData.firstName.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: true }))
      hasErrors = true
    }
    if (!formData.lastName.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: true }))
      hasErrors = true
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }))
      hasErrors = true
    }
    if (formData.password.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }))
      hasErrors = true
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: true }))
      hasErrors = true
    }
    if (!formData.termsAccepted) {
      setErrors((prevErrors) => ({ ...prevErrors, termsAccepted: true }))
      hasErrors = true
    }

    if (!hasErrors) {
      // Handle form submission
      console.log('Form submitted:', formData)
      // You can add your server-side logic here to create a new user account
    }
  }

  const validateEmail = (email: string) => {
    // Basic email validation
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  return (
    // Registration form UI
  )
}
