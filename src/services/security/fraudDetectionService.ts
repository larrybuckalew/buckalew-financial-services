import { PrismaClient } from '@prisma/client';
import * as tf from '@tensorflow/tfjs-node';

export interface TransactionRiskScore {
  transactionId: string;
  riskScore: number;
  flaggedReasons: string[];
}

class FraudDetectionService {
  private prisma: PrismaClient;
  private model: tf.Sequential | null = null;

  constructor() {
    this.prisma = new PrismaClient();
    this.initializeModel();
  }

  // Initialize machine learning model
  private async initializeModel(): Promise<void> {
    // Create a simple sequential model for fraud detection
    this.model = tf.sequential();

    // Add layers
    this.model.add(tf.layers.dense({
      inputShape: [6], // Features: amount, time, location, previous transactions, etc.
      units: 10,
      activation: 'relu'
    }));

    this.model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid' // Output probability of fraud
    }));

    // Compile the model
    this.model.compile({
      optimizer: 'adam',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });
  }

  // Extract transaction features
  private extractTransactionFeatures(transaction: any): number[] {
    return [
      transaction.amount,
      new Date(transaction.timestamp).getHours(),
      this.normalizeLocation(transaction.location),
      transaction.merchantType,
      transaction.previousTransactionCount,
      transaction.accountAge
    ];
  }

  // Normalize location (simplified)
  private normalizeLocation(location: string): number {
    // Implement location-based normalization
    // Could use geohash, distance from typical locations, etc.
    return 0;
  }

  // Assess transaction risk
  async assessTransactionRisk(transaction: any): Promise<TransactionRiskScore> {
    if (!this.model) {
      throw new Error('Fraud detection model not initialized');
    }

    // Extract features
    const features = this.extractTransactionFeatures(transaction);
    const tensorFeatures = tf.tensor2d([features]);

    // Predict fraud probability
    const prediction = this.model.predict(tensorFeatures) as tf.Tensor;
    const riskScore = (prediction.dataSync()[0] * 100);

    // Identify fraud flags
    const flaggedReasons = this.identifyFraudFlags(transaction, riskScore);

    // Log the potentially fraudulent transaction
    await this.logPotentialFraudAttempt(transaction, riskScore, flaggedReasons);

    return {
      transactionId: transaction.id,
      riskScore,
      flaggedReasons
    };
  }

  // Identify specific fraud flags
  private identifyFraudFlags(transaction: any, riskScore: number): string[] {
    const flags: string[] = [];

    // Unusual transaction amount
    if (transaction.amount > transaction.averageSpend * 3) {
      flags.push('Unusually high transaction amount');
    }

    // Suspicious location
    if (transaction.location !== transaction.primaryLocation) {
      flags.push('Transaction from unusual location');
    }

    // Rapid successive transactions
    if (transaction.rapidTransactionCount > 3) {
      flags.push('Multiple rapid transactions detected');
    }

    // High-risk time of day
    const hour = new Date(transaction.timestamp).getHours();
    if (hour < 6 || hour > 22) {
      flags.push('Transaction at suspicious time');
    }

    // Overall risk score threshold
    if (riskScore > 75) {
      flags.push('High overall fraud risk');
    }

    return flags;
  }

  // Log potential fraud attempts
  private async logPotentialFraudAttempt(
    transaction: any, 
    riskScore: number, 
    flags: string[]
  ): Promise<void> {
    await this.prisma.fraudAlert.create({
      data: {
        userId: transaction.userId,
        transactionId: transaction.id,
        riskScore,
        flaggedReasons: flags,
        timestamp: new Date()
      }
    });
  }

  // Train fraud detection model periodically
  async trainFraudModel(): Promise<void> {
    // Fetch historical transaction data
    const transactions = await this.prisma.transaction.findMany({
      where: { markedFraudulent: true }
    });

    // Prepare training data
    const trainingData = transactions.map(t => 
      this.extractTransactionFeatures(t)
    );

    const labels = transactions.map(t => 
      t.markedFraudulent ? 1 : 0
    );

    // Convert to tensors
    const xs = tf.tensor2d(trainingData);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    // Train the model
    await this.model?.fit(xs, ys, {
      epochs: 50,
      batchSize: 32
    });
  }

  // Get recent fraud alerts
  async getRecentFraudAlerts(userId?: string): Promise<any[]> {
    return this.prisma.fraudAlert.findMany({
      where: {
        userId,
        timestamp: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      },
      orderBy: { timestamp: 'desc' }
    });
  }
}

export default new FraudDetectionService();
