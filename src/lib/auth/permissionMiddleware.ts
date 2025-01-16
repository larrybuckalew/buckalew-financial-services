import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { AdvancedPermissionManager } from './advancedPermissions';
import { AuthorizationError } from '../errors/customErrorClasses';

export const withPermission = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  requiredAction: string
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ 
        message: 'Authentication required' 
      });
    }

    const hasPermission = AdvancedPermissionManager.checkPermission(
      session.user.role, 
      requiredAction,
      { 
        userId: session.user.id,
        department: session.user.department
      }
    );

    if (!hasPermission) {
      throw new AuthorizationError('Insufficient permissions');
    }

    return handler(req, res);
  };
};