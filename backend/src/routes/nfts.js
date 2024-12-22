import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { handleError } from '../utils/error-handler.js';

const router = Router();

/**
 * @swagger
 * /api/nfts:
 *   get:
 *     summary: Get all NFTs with pagination
 *     tags: [NFTs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of NFTs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NFT'
 */
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const start = (page - 1) * limit;
    
    const { data, error } = await supabase
      .from('nfts')
      .select('*, collections(*)')
      .range(start, start + limit - 1);
      
    if (error) throw error;
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /api/nfts/{id}:
 *   get:
 *     summary: Get a single NFT by ID
 *     tags: [NFTs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: NFT ID
 *     responses:
 *       200:
 *         description: NFT details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFT'
 *       404:
 *         description: NFT not found
 */
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('nfts')
      .select('*, collections(*)')
      .eq('id', req.params.id)
      .single();
      
    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'NFT not found' });
    }
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /api/nfts/{id}/price-history:
 *   get:
 *     summary: Get NFT price history
 *     tags: [NFTs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: NFT ID
 *     responses:
 *       200:
 *         description: Price history for the NFT
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   price:
 *                     type: number
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
router.get('/:id/price-history', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('price, created_at')
      .eq('nft_id', req.params.id)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;