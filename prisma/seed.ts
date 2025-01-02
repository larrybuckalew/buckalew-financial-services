import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        passwordHash: await bcrypt.hash('adminpass123', 10),
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        profile: {
          create: {
            phoneNumber: '555-0100',
            dateOfBirth: new Date('1980-01-01'),
            address: '123 Admin St',
            city: 'Adminville',
            state: 'CA',
            zipCode: '90210',
          }
        }
      }
    });

    // Create advisor user
    const advisorUser = await prisma.user.create({
      data: {
        email: 'advisor@example.com',
        passwordHash: await bcrypt.hash('advisorpass123', 10),
        firstName: 'Financial',
        lastName: 'Advisor',
        role: 'ADVISOR',
        profile: {
          create: {
            phoneNumber: '555-0200',
            dateOfBirth: new Date('1985-01-01'),
            address: '456 Advisor Ave',
            city: 'Consultville',
            state: 'NY',
            zipCode: '10001',
          }
        }
      }
    });

    // Create test client user
    const clientUser = await prisma.user.create({
      data: {
        email: 'client@example.com',
        passwordHash: await bcrypt.hash('clientpass123', 10),
        firstName: 'Test',
        lastName: 'Client',
        role: 'CLIENT',
        profile: {
          create: {
            phoneNumber: '555-0300',
            dateOfBirth: new Date('1990-01-01'),
            address: '789 Client Rd',
            city: 'Clienttown',
            state: 'TX',
            zipCode: '75001',
            riskTolerance: 'MODERATE',
            investmentGoals: 'Retirement and Education Savings'
          }
        },
        accounts: {
          create: [
            {
              type: 'CHECKING',
              number: '1234567890',
              institution: 'Test Bank',
              balance: 5000.00,
            },
            {
              type: 'INVESTMENT',
              number: '0987654321',
              institution: 'Test Investment',
              balance: 100000.00,
            }
          ]
        },
        portfolios: {
          create: {
            name: 'Retirement Portfolio',
            type: 'RETIREMENT',
            balance: 100000.00,
            holdings: {
              create: [
                {
                  symbol: 'VTI',
                  shares: 100,
                  costBasis: 200.00,
                  currentValue: 220.00,
                },
                {
                  symbol: 'BND',
                  shares: 200,
                  costBasis: 85.00,
                  currentValue: 82.50,
                }
              ]
            }
          }
        }
      }
    });

    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();