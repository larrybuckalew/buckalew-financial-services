import React, { useState } from 'react'
import { generateA11yAttributes } from '../../lib/accessibility/a11y'

interface AccessibleInputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel'
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const a11yProps = generateA11yAttributes.input(label, error)

  return (
    <div className="mb-4">
      <label 
        htmlFor={label.toLowerCase().replace(/\s+/g, '-')} 
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={label.toLowerCase().replace(/\s+/g, '-')}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={`
          w-full px-3 py-2 border rounded
          ${isFocused ? 'border-blue-500 outline-none ring-2 ring-blue-200' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
        `}
        {...a11yProps}
      />
      {error && (
        <p 
          id={`${label.toLowerCase().replace(/\s+/g, '-')}-error`} 
          className="text-red-500 text-xs mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

interface AccessibleFormProps {
  children: React.ReactNode
  onSubmit: (e: React.FormEvent) => void
  ariaLabel?: string
}

export const AccessibleForm: React.FC<AccessibleFormProps> = ({
  children,
  onSubmit,
  ariaLabel = 'Form'
}) => {
  return (
    <form 
      onSubmit={onSubmit}
      aria-label={ariaLabel}
      role="form"
      className="space-y-4"
    >
      {children}
    </form>
  )
}