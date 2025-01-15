import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('AdminPassword123!', 10)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@buckalew-financial.com',
      name: 'Larry Buckalew',
      password: adminPassword,
      role: 'ADMIN',
      profile: {
        create: {
          phoneNumber: '+1 (800) BUCKALEW',
          address: '123 Financial Way, Advisor City, AC 12345'
        }
      }
    }
  })

  console.log('Admin user created:', adminUser.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })