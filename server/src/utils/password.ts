import crypto from 'crypto'

export function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex')
  return { salt, hash }
}

export function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  const derived = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(expectedHash, 'hex'), Buffer.from(derived, 'hex'))
  } catch {
    return false
  }
} 