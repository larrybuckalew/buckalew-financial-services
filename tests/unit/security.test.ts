import { sanitizeInput, validatePasswordStrength, validateEmail } from '../../lib/utils/security'

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('removes HTML tags', () => {
      const input = '<script>alert("test");</script>Hello World'
      const sanitized = sanitizeInput(input)
      expect(sanitized).toBe('alert("test");Hello World')
    })

    it('limits input length', () => {
      const longInput = 'a'.repeat(600)
      const sanitized = sanitizeInput(longInput)
      expect(sanitized.length).toBe(500)
    })
  })

  describe('validatePasswordStrength', () => {
    it('accepts strong password', () => {
      const strongPassword = 'StrongP@ssw0rd!'
      expect(validatePasswordStrength(strongPassword)).toBe(true)
    })

    it('rejects weak password', () => {
      const weakPasswords = [
        'short',
        'onlylowercase',
        'ONLYUPPERCASE',
        'NoSpecialChar123',
        'no_number!'
      ]
      weakPasswords.forEach(password => {
        expect(validatePasswordStrength(password)).toBe(false)
      })
    })
  })

  describe('validateEmail', () => {
    it('accepts valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'john.doe@company.co.uk',
        'email+tag@example.org'
      ]
      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true)
      })
    })

    it('rejects invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        'missing@domain',
        '@missinguser.com',
        'spaces not@allowed.com',
        'multiple@@signs.com'
      ]
      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false)
      })
    })
  })
})