import * as crypto from 'crypto';
/**
 * makeSalt
 * 随机盐
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}
/**
 * encryptPassword 根据盐加密密码
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return crypto.pbkdf2Sync(password, tempSalt, 1000, 16, 'sha1').toString('base64');
}
