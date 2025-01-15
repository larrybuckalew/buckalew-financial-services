import jwt from 'jsonwebtoken'

interface TokenPayload {
  userId: string
  role: string
  email: string
}

export class JWTManager {
  private static SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret'

  public static generateToken(payload: TokenPayload, expiresIn: string = '1h'): string {
    return jwt.sign(payload, this.SECRET_KEY, { expiresIn })
  }

  public static verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, this.SECRET_KEY) as TokenPayload
    } catch (error) {
      return null
    }
  }

  public static decodeToken(token: string): TokenPayload | null {
    return jwt.decode(token) as TokenPayload
  }

  public static refreshToken(token: string, expiresIn: string = '7d'): string | null {
    const decoded = this.verifyToken(token)
    if (!decoded) return null

    // Remove exp and iat for new token
    const { exp, iat, ...payload } = decoded
    return this.generateToken(payload as TokenPayload, expiresIn)
  }
}