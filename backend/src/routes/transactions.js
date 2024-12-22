import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { handleError } from '../utils/error-handler.js';
import { wsManager } from '../index.js';

const router = Router();

// Get recent transactions
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        nfts (
          id,
          name,
          image_url,
          collections (
            id,
            name
          )
        )
      `)
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (error) throw error;
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

// Create new transaction with WebSocket notification
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert(req.body)
      .select()
      .single();

    if (error) throw error;

    // Broadcast updates to relevant subscribers
    wsManager.broadcast(`nft:${data.nft_id}`, {
      type: 'NEW_TRANSACTION',
      transaction: data
    });

    if (data.nfts?.collections?.id) {
      wsManager.broadcast(`collection:${data.nfts.collections.id}`, {
        type: 'COLLECTION_UPDATE',
        transaction: data
      });
    }

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;