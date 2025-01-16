import * as tf from '@tensorflow/tfjs-node';
import { PrismaClient } from '@prisma/client';
import loggingService from '@/services/monitoring/loggingService';

interface TrainingConfig {
  minSampleSize: number;
  trainingInterval: number; // in milliseconds
  modelPath: string;
}

class ContinuousModelTrainer {
  private prisma: PrismaClient;
  private config: TrainingConfig;
  private trainingInterval: NodeJS.Timeout | null = null;

  constructor(config?: Partial<TrainingConfig>) {
    this.prisma = new PrismaClient();
    this.config = {
      minSampleSize: 1000,
      trainingInterval: 24 * 60 * 60 * 1000, // Daily
      modelPath: './fraud-detection-model',
      ...config
    };
  }

  // Start continuous training
  async startContinuousTraining(): Promise<void> {
    await this.trainModel(); // Initial training

    // Set up recurring training
    this.trainingInterval = setInterval(async () => {
      try {
        await this.trainModel();
      } catch (error) {
        await loggingService.error('Continuous model training failed', { 
          error: error.message 
        });
      }
    }, this.config.trainingInterval);
  }

  // Stop continuous training
  stopContinuousTraining(): void {
    if (this.trainingInterval) {
      clearInterval(this.trainingInterval);
      this.trainingInterval = null;
    }
  }

  // Train fraud detection model
  async trainModel(): Promise<void> {
    const startTime = Date.now();

    try {
      // Fetch recent fraudulent and non-fraudulent transactions
      const transactions = await this.fetchTrainingData();

      // Check if we have enough samples
      if (transactions.length < this.config.minSampleSize) {
        await loggingService.warn('Insufficient training data', {
          currentSampleSize: transactions.length
        });
        return;
      }

      // Prepare training data
      const { features, labels } = this.prepareTrainingData(transactions);

      // Create and compile model
      const model = this.createModel();

      // Convert to tensors
      const xs = tf.tensor2d(features);
      const ys = tf.tensor2d(labels, [labels.length, 1]);

      // Train the model
      await model.fit(xs, ys, {
        epochs: 50,
        batchSize: 32,
        callbacks: {
          onEpochEnd: async (epoch, logs) => {
            await loggingService.info('Model training progress', {
              epoch,
              loss: logs?.loss,
              accuracy: logs?.acc
            });
          }
        }
      });

      // Save the model
      await model.save(`file://${this.config.modelPath}`);

      // Log training completion
      await loggingService.info('Fraud detection model trained', {
        trainingDuration: Date.now() - startTime,
        sampleSize: transactions.length
      });

    } catch (error) {
      await loggingService.error('Model training failed', { 
        error: error.message 
      });
    }
  }

  // Fetch training data from database
  private async fetchTrainingData(): Promise<any[]> {
    // Fetch transactions with fraud labels from the last 90 days
    return this.prisma.transaction.findMany({
      where: {
        OR: [
          { markedFraudulent: true },
          { riskScore: { gt: 75 } }
        ],
        createdAt: {
          gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
        }
      },
      take: 10000 // Limit to prevent memory issues
    });
  }

  // Prepare training data
  private prepareTrainingData(transactions: any[]): { 
    features: number[][], 
    labels: number[][] 
  } {
    const features: number[][] = [];
    const labels: number[][] = [];

    transactions.forEach(tx => {
      const featureVector = [
        tx.amount,
        new Date(tx.timestamp).getHours(),
        tx.merchant ? this.encodeMerchant(tx.merchant) : 0,
        tx.location ? this.encodeLocation(tx.location) : 0,
        tx.previousTransactionCount || 0,
        tx.accountAge || 0
      ];

      features.push(featureVector);
      labels.push([tx.markedFraudulent ? 1 : 0]);
    });

    return { features, labels };
  }

  // Create neural network model
  private createModel(): tf.Sequential {
    const model = tf.sequential();

    // Input layer
    model.add(tf.layers.dense({
      inputShape: [6],
      units: 12,
      activation: 'relu'
    }));

    // Hidden layers
    model.add(tf.layers.dense({
      units: 8,
      activation: 'relu'
    }));

    // Output layer
    model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid'
    }));

    // Compile the model
    model.compile({
      optimizer: 'adam',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  // Simple encoding methods (can be replaced with more sophisticated techniques)
  private encodeMerchant(merchant: string): number {
    // Basic hash-based encoding
    let hash = 0;
    for (let i = 0; i < merchant.length; i++) {
      hash = ((hash << 5) - hash) + merchant.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash % 1000);
  }

  private encodeLocation(location: string): number {
    // Similar to merchant encoding
    let hash = 0;
    for (let i = 0; i < location.length; i++) {
      hash = ((hash << 5) - hash) + location.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash % 1000);
  }
}

export default new ContinuousModelTrainer();
