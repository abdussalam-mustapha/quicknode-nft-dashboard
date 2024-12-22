import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { requireAuth } from '../middleware/auth.js';
import { handleError } from '../utils/error-handler.js';

const router = Router();

// Get user's watchlist
router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_watchlist')
      .select(`
        *,
        nfts (
          *,
          collections (*)
        )
      `)
      .eq('user_id', req.user.id);
      
    if (error) throw error;
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

// Add NFT to watchlist
router.post('/:nftId', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_watchlist')
      .insert({
        user_id: req.user.id,
        nft_id: req.params.nftId
      })
      .select()
      .single();
      
    if (error) throw error;
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

// Remove NFT from watchlist
router.delete('/:nftId', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('user_watchlist')
      .delete()
      .eq('user_id', req.user.id)
      .eq('nft_id', req.params.nftId);
      
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;