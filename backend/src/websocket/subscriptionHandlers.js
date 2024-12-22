import { supabase } from '../lib/supabase.js';

export async function handleNFTSubscription(ws, data, subscribers) {
  const { nftId } = data;
  
  try {
    // Verify NFT exists
    const { data: nft, error } = await supabase
      .from('nfts')
      .select('id')
      .eq('id', nftId)
      .single();

    if (error || !nft) {
      ws.send(JSON.stringify({ 
        type: 'ERROR', 
        error: 'NFT not found' 
      }));
      return;
    }

    // Add to subscribers
    const topic = `nft:${nftId}`;
    if (!subscribers.has(topic)) {
      subscribers.set(topic, []);
    }
    subscribers.get(topic).push(ws);

    ws.send(JSON.stringify({ 
      type: 'SUBSCRIBED', 
      topic 
    }));
  } catch (error) {
    console.error('NFT subscription error:', error);
    ws.send(JSON.stringify({ 
      type: 'ERROR', 
      error: 'Failed to subscribe to NFT' 
    }));
  }
}

export async function handleCollectionSubscription(ws, data, subscribers) {
  const { collectionId } = data;
  
  try {
    // Verify collection exists
    const { data: collection, error } = await supabase
      .from('collections')
      .select('id')
      .eq('id', collectionId)
      .single();

    if (error || !collection) {
      ws.send(JSON.stringify({ 
        type: 'ERROR', 
        error: 'Collection not found' 
      }));
      return;
    }

    // Add to subscribers
    const topic = `collection:${collectionId}`;
    if (!subscribers.has(topic)) {
      subscribers.set(topic, []);
    }
    subscribers.get(topic).push(ws);

    ws.send(JSON.stringify({ 
      type: 'SUBSCRIBED', 
      topic 
    }));
  } catch (error) {
    console.error('Collection subscription error:', error);
    ws.send(JSON.stringify({ 
      type: 'ERROR', 
      error: 'Failed to subscribe to collection' 
    }));
  }
}