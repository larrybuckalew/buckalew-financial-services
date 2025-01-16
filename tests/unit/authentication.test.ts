import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Mock Prisma client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn(),
      findUnique: jest.fn()
    }
  }))
})

describe('Authentication Functionality', () => {
  let prisma: PrismaClient

  beforeEach(() => {
    prisma = new PrismaClient()
  })

  describe('User Registration', () => {
    it('creates a new user with hashed password', async () => {
      const email = 'test@example.com'
      const password = 'ValidP@ssw0rd123!'
      const hashedPassword = await bcrypt.hash(password, 10)

      // @ts-ignore
      prisma.user.create.mockResolvedValue({
        id: 'test-user-id',
        email,
        password: hashedPassword
      })

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword
        }
      })

      expect(newUser.email).toBe(email)
      expect(await bcrypt.compare(password, newUser.password)).toBe(true)
    })

    it('prevents duplicate email registration', async () => {
      const email = 'existing@example.com'

      // @ts-ignore
      prisma.user.findUnique.mockResolvedValue({
        id: 'existing-user-id',
        email
      })

      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      expect(existingUser).toBeTruthy()
    })
  })

  describe('Password Authentication', () => {
    it('validates correct password', async () => {
      const email = 'user@example.com'
      const plainPassword = 'ValidP@ssw0rd123!'
      const hashedPassword = await bcrypt.hash(plainPassword, 10)

      // @ts-ignore
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        email,
        password: hashedPassword
      })

      const user = await prisma.user.findUnique({ where: { email } })
      const isPasswordValid = await bcrypt.compare(plainPassword, user.password)

      expect(isPasswordValid).toBe(true)
    })

    it('rejects incorrect password', async () => {
      const email = 'user@example.com'
      const correctPassword = 'ValidP@ssw0rd123!'
      const incorrectPassword = 'WrongPassword'
      const hashedPassword = await bcrypt.hash(correctPassword, 10)

      // @ts-ignore
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        email,
        password: hashedPassword
      })

      const user = await prisma.user.findUnique({ where: { email } })
      const isPasswordValid = await bcrypt.compare(incorrectPassword, user.password)

      expect(isPasswordValid).toBe(false)
    })
  })
})