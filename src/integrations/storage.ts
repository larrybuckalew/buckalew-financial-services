import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class StorageService {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
    this.bucket = process.env.AWS_S3_BUCKET!;
  }

  async uploadFile(key: string, file: Buffer, metadata: Record<string, string> = {}) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ContentType: metadata.contentType,
        Metadata: metadata
      });

      await this.s3Client.send(command);
      return key;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async getSignedDownloadUrl(key: string, expiryMinutes: number = 60) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key
      });

      return await getSignedUrl(this.s3Client, command, {
        expiresIn: expiryMinutes * 60
      });
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw error;
    }
  }

  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  generateDocumentKey(userId: string, documentType: string, filename: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `documents/${userId}/${documentType}/${timestamp}-${filename}`;
  }

  async uploadUserDocument(
    userId: string,
    documentType: string,
    file: Buffer,
    filename: string,
    metadata: Record<string, string> = {}
  ) {
    const key = this.generateDocumentKey(userId, documentType, filename);
    return this.uploadFile(key, file, {
      ...metadata,
      userId,
      documentType
    });
  }
}

export const storageService = new StorageService();