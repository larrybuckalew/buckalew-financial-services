import crypto from 'crypto'

export class SecurityEncryption {
  private static algorithm = 'aes-256-cbc'
  private static key = crypto.randomBytes(32)
  private static iv = crypto.randomBytes(16)

  // Encrypt sensitive data
  public static encrypt(data: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm, 
      Buffer.from(this.key), 
      this.iv
    )
    let encrypted = cipher.update(data)
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return this.iv.toString('hex') + ':' + encrypted.toString('hex')
  }

  // Decrypt sensitive data
  public static decrypt(encryptedData: string): string {
    const textParts = encryptedData.split(':')
    const iv = Buffer.from(textParts[0], 'hex')
    const encryptedText = Buffer.from(textParts[1], 'hex')

    const decipher = crypto.createDecipheriv(
      this.algorithm, 
      Buffer.from(this.key), 
      iv
    )
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
  }

  // Generate secure random token
  public static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex')
  }

  // Hash password with salt
  public static hashPassword(password: string, salt?: string): { hash: string, salt: string } {
    salt = salt || crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(
      password, 
      salt, 
      1000, 
      64, 
      'sha512'
    ).toString('hex')

    return { hash, salt }
  }

  // Verify password
  public static verifyPassword(
    password: string, 
    storedHash: string, 
    storedSalt: string
  ): boolean {
    const { hash } = this.hashPassword(password, storedSalt)
    return hash === storedHash
  }
}