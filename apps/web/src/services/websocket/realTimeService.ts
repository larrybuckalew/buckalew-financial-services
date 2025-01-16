import { WebSocket } from 'ws';

export interface RealTimeUpdate {
  type: 'MARKET_DATA' | 'PORTFOLIO_UPDATE' | 'TRANSACTION_ALERT';
  data: any;
  timestamp: number;
}

class RealTimeService {
  private static instance: RealTimeService;
  private ws: WebSocket | null = null;
  private subscribers: Map<string, Set<(update: RealTimeUpdate) => void>> = new Map();

  private constructor() {}

  public static getInstance(): RealTimeService {
    if (!RealTimeService.instance) {
      RealTimeService.instance = new RealTimeService();
    }
    return RealTimeService.instance;
  }

  connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('WebSocket connection established');
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.ws.onmessage = (event) => {
        try {
          const update: RealTimeUpdate = JSON.parse(event.data.toString());
          this.notifySubscribers(update);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    });
  }

  subscribe(type: RealTimeUpdate['type'], callback: (update: RealTimeUpdate) => void) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type)!.add(callback);

    return () => {
      this.subscribers.get(type)!.delete(callback);
    };
  }

  private notifySubscribers(update: RealTimeUpdate) {
    const typeSubscribers = this.subscribers.get(update.type);
    if (typeSubscribers) {
      typeSubscribers.forEach(callback => callback(update));
    }
  }

  sendMessage(message: RealTimeUpdate) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default RealTimeService;
