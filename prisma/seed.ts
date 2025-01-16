import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';  // You'll need to install bcryptjs

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.user.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.account.deleteMany();

  // Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@buckalew.com',
      name: 'Admin User',
      password: await bcrypt.hash('AdminPassword123!', 10),
      role: 'ADMIN',
      emailVerified: true,
      profile: {
        create: {
          phoneNumber: '555-ADMIN-123',
          address: '123 Financial Plaza',
          city: 'Financial City',
          state: 'FN',
          zip: '12345',
          annualIncome: 250000,
          employmentStatus: 'Executive',
          riskTolerance: 5
        }
      }
    }
  });

  // Create Sample Client Users
  const clientUsers = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      profile: {
        phoneNumber: '555-111-2222',
        address: '456 Investor Road',
        city: 'Wealth City',
        state: 'WC',
        zip: '67890',
        annualIncome: 120000,
        employmentStatus: 'Professional',
        riskTolerance: 3,
        dateOfBirth: new Date('1985-05-15')
      }
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      profile: {
        phoneNumber: '555-333-4444',
        address: '789 Investment Avenue',
        city: 'Portfolio Town',
        state: 'PT',
        zip: '54321',
        annualIncome: 95000,
        employmentStatus: 'Consultant',
        riskTolerance: 4,
        dateOfBirth: new Date('1990-11-20')
      }
    }
  ];

  for (const userData of clientUsers) {
    await prisma.user.create({
      data: {
        ...userData,
        password: await bcrypt.hash('ClientPassword123!', 10),
        role: 'CLIENT',
        emailVerified: true,
        profile: {
          create: userData.profile
        }
      }
    });
  }

  // Create Sample Accounts
  const accounts = [
    {
      accountNumber: 'BFS-CHK-001',
      accountType: 'CHECKING',
      balance: 25000
    },
    {
      accountNumber: 'BFS-INV-001',
      accountType: 'INVESTMENT',
      balance: 100000
    }
  ];

  for (const accountData of accounts) {
    await prisma.account.create({
      data: {
        ...accountData,
        userId: adminUser.id
      }
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
