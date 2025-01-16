import { Storage } from '@google-cloud/storage';
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger } from './logger';

const execAsync = promisify(exec);

class BackupService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE
    });
    this.bucket = process.env.BACKUP_BUCKET!;
  }

  private async generateDatabaseBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.sql`;
    const command = `pg_dump ${process.env.DATABASE_URL} > ${filename}`;
    
    try {
      await execAsync(command);
      return filename;
    } catch (error) {
      logger.error('Database backup generation failed', error);
      throw error;
    }
  }

  async performBackup() {
    try {
      // Generate database backup
      const backupFile = await this.generateDatabaseBackup();

      // Upload to cloud storage
      await this.storage
        .bucket(this.bucket)
        .upload(backupFile, {
          destination: `database-backups/${backupFile}`,
          metadata: {
            contentType: 'application/sql',
            metadata: {
              timestamp: new Date().toISOString(),
              environment: process.env.NODE_ENV
            }
          }
        });

      logger.info('Backup completed successfully', { filename: backupFile });
    } catch (error) {
      logger.error('Backup failed', error);
      throw error;
    }
  }

  async listBackups() {
    try {
      const [files] = await this.storage
        .bucket(this.bucket)
        .getFiles({ prefix: 'database-backups/' });

      return files.map(file => ({
        name: file.name,
        size: file.metadata.size,
        created: file.metadata.timeCreated
      }));
    } catch (error) {
      logger.error('Failed to list backups', error);
      throw error;
    }
  }

  async restoreFromBackup(backupFile: string) {
    try {
      // Download backup file
      await this.storage
        .bucket(this.bucket)
        .file(`database-backups/${backupFile}`)
        .download({ destination: backupFile });

      // Restore database
      const command = `psql ${process.env.DATABASE_URL} < ${backupFile}`;
      await execAsync(command);

      logger.info('Database restored successfully', { backup: backupFile });
    } catch (error) {
      logger.error('Database restoration failed', error);
      throw error;
    }
  }
}

export const backupService = new BackupService();