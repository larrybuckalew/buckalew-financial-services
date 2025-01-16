import { PrismaClient, UserRole } from '@prisma/client';

class RoleService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Define role permissions
  private readonly rolePermissions = {
    [UserRole.ADMIN]: ['*'],
    [UserRole.ADVISOR]: [
      'READ_CLIENT_DATA',
      'UPDATE_CLIENT_DATA',
      'MANAGE_PORTFOLIOS',
      'VIEW_ANALYTICS',
      'SEND_MESSAGES'
    ],
    [UserRole.CLIENT]: [
      'VIEW_OWN_DATA',
      'UPDATE_PROFILE',
      'VIEW_PORTFOLIO',
      'SEND_MESSAGES'
    ]
  };

  hasPermission(userRole: UserRole, permission: string): boolean {
    const permissions = this.rolePermissions[userRole];
    return permissions.includes('*') || permissions.includes(permission);
  }

  async assignRole(userId: string, role: UserRole) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role }
    });
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!user) return [];
    return this.rolePermissions[user.role] || [];
  }
}