import { supabase } from '../lib/supabase.js';

export async function requireAuth(req, res, next) {
  try {
    const { user } = await supabase.auth.getUser();
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}