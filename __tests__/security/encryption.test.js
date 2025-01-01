import { encrypt, decrypt } from '@/lib/security/encryption';

describe('Encryption Utils', () => {
  const testKey = 'test-secret-key';
  const testData = 'sensitive-information';

  test('should encrypt and decrypt data correctly', () => {
    const encrypted = encrypt(testData, testKey);
    expect(typeof encrypted).toBe('string');
    expect(encrypted).not.toBe(testData);

    const decrypted = decrypt(encrypted, testKey);
    expect(decrypted).toBe(testData);
  });

  test('should generate different ciphertexts for same input', () => {
    const encrypted1 = encrypt(testData, testKey);
    const encrypted2 = encrypt(testData, testKey);
    expect(encrypted1).not.toBe(encrypted2);
  });

  test('should throw error on decryption with wrong key', () => {
    const encrypted = encrypt(testData, testKey);
    expect(() => {
      decrypt(encrypted, 'wrong-key');
    }).toThrow();
  });
});
