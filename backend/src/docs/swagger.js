import swaggerJsdoc from 'swagger-jsdoc';

const serverUrl = process.env.API_URL || 'http://localhost:3000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NFT Marketplace API',
      version: '1.0.0',
      description: 'API documentation for the NFT Marketplace',
    },
    servers: [
      {
        url: serverUrl,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      }
    ],
    components: {
      schemas: {
        NFT: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            token_id: { type: 'string' },
            collection_id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            image_url: { type: 'string' },
            current_price: { type: 'number' },
            owner_address: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        Collection: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            floor_price: { type: 'number' },
            volume_traded: { type: 'number' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            nft_id: { type: 'string', format: 'uuid' },
            from_address: { type: 'string' },
            to_address: { type: 'string' },
            price: { type: 'number' },
            transaction_hash: { type: 'string' },
            transaction_type: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};