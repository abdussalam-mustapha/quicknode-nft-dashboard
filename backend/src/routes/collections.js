import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { handleError } from '../utils/error-handler.js';

const router = Router();

// Get all collections
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('volume_traded', { ascending: false });
      
    if (error) throw error;
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

// Get collection stats
router.get('/:id/stats', async (req, res) => {
  try {
    const { data: collection, error: collectionError } = await supabase
      .from('collections')
      .select('*')
      .eq('id', req.params.id)
      .single();
      
    if (collectionError) throw collectionError;
    
    const { data: nfts, error: nftsError } = await supabase
      .from('nfts')
      .select('current_price')
      .eq('collection_id', req.params.id);
      
    if (nftsError) throw nftsError;
    
    const stats = {
      ...collection,
      total_nfts: nfts.length,
      average_price: nfts.reduce((acc, nft) => acc + (nft.current_price || 0), 0) / nfts.length
    };
    
    res.json(stats);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;