import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { specs } from './docs/swagger.js';
import { WebSocketManager } from './websocket/WebSocketManager.js';

// Load environment variables
config();

const app = express();
const server = createServer(app);

// Initialize WebSocket manager
const wsManager = new WebSocketManager(server);

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// API Routes
import nftRoutes from './routes/nfts.js';
import collectionRoutes from './routes/collections.js';
import transactionRoutes from './routes/transactions.js';
import watchlistRoutes from './routes/watchlist.js';

app.use('/api/nfts', nftRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Export wsManager for use in routes
export { wsManager };

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});