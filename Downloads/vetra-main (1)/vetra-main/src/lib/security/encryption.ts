/**
 * Encryption System
 * Chiffrement des données sensibles au repos et en transit
 */

import crypto from 'crypto';

// Clé de chiffrement depuis les variables d'environnement
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

/**
 * Génère une clé de chiffrement depuis un mot de passe (PBKDF2)
 */
function deriveKey(password: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
}

/**
 * Chiffre une donnée avec AES-256-GCM
 */
export function encrypt(data: string, key?: string): string {
  try {
    const encryptionKey = key || ENCRYPTION_KEY;
    const salt = crypto.randomBytes(SALT_LENGTH);
    const derivedKey = deriveKey(encryptionKey, salt);
    const iv = crypto.randomBytes(IV_LENGTH);
    
    const cipher = crypto.createCipheriv(ALGORITHM, derivedKey, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    // Format: salt:iv:tag:encrypted
    return `${salt.toString('hex')}:${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Déchiffre une donnée chiffrée
 */
export function decrypt(encryptedData: string, key?: string): string {
  try {
    const encryptionKey = key || ENCRYPTION_KEY;
    const parts = encryptedData.split(':');
    
    if (parts.length !== 4) {
      throw new Error('Invalid encrypted data format');
    }
    
    const [saltHex, ivHex, tagHex, encrypted] = parts;
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    
    const derivedKey = deriveKey(encryptionKey, salt);
    
    const decipher = crypto.createDecipheriv(ALGORITHM, derivedKey, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Hash une donnée (irréversible, pour mots de passe, etc.)
 */
export function hash(data: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(data, generatedSalt, 100000, 64, 'sha512')
    .toString('hex');
  
  return { hash, salt: generatedSalt };
}

/**
 * Vérifie un hash
 */
export function verifyHash(data: string, hash: string, salt: string): boolean {
  const newHash = crypto
    .pbkdf2Sync(data, salt, 100000, 64, 'sha512')
    .toString('hex');
  
  return crypto.timingSafeEqual(Buffer.from(newHash), Buffer.from(hash));
}

/**
 * Génère un token sécurisé
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash un token pour stockage (SHA-256)
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Chiffre un objet JSON
 */
export function encryptObject<T extends Record<string, any>>(obj: T, key?: string): string {
  return encrypt(JSON.stringify(obj), key);
}

/**
 * Déchiffre un objet JSON
 */
export function decryptObject<T extends Record<string, any>>(encryptedData: string, key?: string): T {
  const decrypted = decrypt(encryptedData, key);
  return JSON.parse(decrypted) as T;
}

/**
 * Masque une donnée sensible (pour logs, etc.)
 */
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
  if (data.length <= visibleChars * 2) {
    return '*'.repeat(data.length);
  }
  return `${data.slice(0, visibleChars)}${'*'.repeat(data.length - visibleChars * 2)}${data.slice(-visibleChars)}`;
}

/**
 * Chiffre les données utilisateur sensibles (email, phone, etc.)
 */
export function encryptUserData(data: Record<string, any>, fieldsToEncrypt: string[]): Record<string, any> {
  const encrypted = { ...data };
  
  for (const field of fieldsToEncrypt) {
    if (encrypted[field] && typeof encrypted[field] === 'string') {
      encrypted[field] = encrypt(encrypted[field]);
    }
  }
  
  return encrypted;
}

/**
 * Déchiffre les données utilisateur sensibles
 */
export function decryptUserData(data: Record<string, any>, fieldsToDecrypt: string[]): Record<string, any> {
  const decrypted = { ...data };
  
  for (const field of fieldsToDecrypt) {
    if (decrypted[field] && typeof decrypted[field] === 'string') {
      try {
        decrypted[field] = decrypt(decrypted[field]);
      } catch (error) {
        // Si le champ n'est pas chiffré, on le laisse tel quel
        console.warn(`Field ${field} is not encrypted, skipping decryption`);
      }
    }
  }
  
  return decrypted;
}

