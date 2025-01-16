import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { authenticator } from 'otplib';
import { User, UserCreateInput, UserUpdateInput } from '../types/user';

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(input: UserCreateInput): Promise<User> {
    const hashedPassword = await hash(input.password, 10);

    return this.prisma.user.create({
      data: {
        email: input.email,
        passwordHash: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        role: input.role,
        profile: {
          create: input.profile
        }
      },
      include: {
        profile: true
      }
    });
  }

  async updateUser(id: string, input: UserUpdateInput): Promise<User> {
    if (input.password) {
      input.passwordHash = await hash(input.password, 10);
      delete input.password;
    }

    return this.prisma.user.update({
      where: { id },
      data: input,
      include: {
        profile: true
      }
    });
  }

  async setupMFA(userId: string): Promise<string> {
    const secret = authenticator.generateSecret();
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        mfaSecret: secret,
        mfaEnabled: false // Will be enabled after verification
      }
    });
    return secret;
  }

  async verifyAndEnableMFA(userId: string, token: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { mfaSecret: true }
    });

    if (!user?.mfaSecret) return false;

    const isValid = authenticator.verify({
      token,
      secret: user.mfaSecret
    });

    if (isValid) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { mfaEnabled: true }
      });
    }

    return isValid;
  }

  async generateBackupCodes(userId: string): Promise<string[]> {
    const codes = Array.from({ length: 10 }, () =>
      Math.random().toString(36).substr(2, 8).toUpperCase()
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: { backupCodes: codes }
    });

    return codes;
  }
}