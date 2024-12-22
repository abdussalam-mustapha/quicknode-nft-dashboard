import { WebSocketServer } from 'ws';
import { handleNFTSubscription, handleCollectionSubscription } from './subscriptionHandlers.js';
import { broadcastToSubscribers } from './broadcaster.js';

export class WebSocketManager {
  constructor(server) {
    this.wss = new WebSocketServer({ server });
    this.subscribers = new Map();
    this.setupWebSocket();
  }

  setupWebSocket() {
    this.wss.on('connection', (ws) => {
      console.log('New WebSocket connection established');

      ws.on('message', async (message) => {
        try {
          const data = JSON.parse(message);
          await this.handleMessage(ws, data);
        } catch (error) {
          console.error('WebSocket message handling error:', error);
          ws.send(JSON.stringify({ 
            type: 'ERROR', 
            error: 'Invalid message format' 
          }));
        }
      });

      ws.on('close', () => {
        this.handleDisconnect(ws);
      });

      // Send initial connection success message
      ws.send(JSON.stringify({ 
        type: 'CONNECTED', 
        message: 'Successfully connected to WebSocket server' 
      }));
    });
  }

  async handleMessage(ws, data) {
    switch (data.type) {
      case 'SUBSCRIBE_NFT':
        await handleNFTSubscription(ws, data, this.subscribers);
        break;
      case 'SUBSCRIBE_COLLECTION':
        await handleCollectionSubscription(ws, data, this.subscribers);
        break;
      case 'UNSUBSCRIBE':
        this.handleUnsubscribe(ws, data);
        break;
      default:
        ws.send(JSON.stringify({ 
          type: 'ERROR', 
          error: 'Unknown message type' 
        }));
    }
  }

  handleDisconnect(ws) {
    console.log('Client disconnected');
    // Clean up subscriptions for disconnected client
    this.subscribers.forEach((subscribers, topic) => {
      const index = subscribers.indexOf(ws);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    });
  }

  handleUnsubscribe(ws, data) {
    const { topic } = data;
    if (this.subscribers.has(topic)) {
      const subscribers = this.subscribers.get(topic);
      const index = subscribers.indexOf(ws);
      if (index !== -1) {
        subscribers.splice(index, 1);
        ws.send(JSON.stringify({ 
          type: 'UNSUBSCRIBED', 
          topic 
        }));
      }
    }
  }

  // Method to broadcast updates to subscribers
  broadcast(topic, data) {
    broadcastToSubscribers(this.subscribers, topic, data);
  }
}