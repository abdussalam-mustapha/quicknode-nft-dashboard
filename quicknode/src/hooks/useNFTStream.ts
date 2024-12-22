import { useEffect } from 'react';
import { useNFTStore } from '../lib/store/nftStore';
import { ENV } from '../lib/config/constants';
import { isValidWsUrl } from '../lib/utils/validation';
import type { NFTSaleEvent, FloorPriceUpdate } from '../lib/streams/types';

export function useNFTStream(collections: string[]) {
  const { addSale, updateFloorPrice } = useNFTStore();

  useEffect(() => {
    if (!collections.length) return;
    if (!isValidWsUrl(ENV.QUICKNODE_WSS_URL)) {
      console.error('Invalid WebSocket URL. Please check your environment variables.');
      return;
    }

    const ws = new WebSocket(ENV.QUICKNODE_WSS_URL);

    ws.onopen = () => {
      collections.forEach(collection => {
        ws.send(JSON.stringify({
          type: 'subscribe',
          event: 'nft_sales',
          collection
        }));
        
        ws.send(JSON.stringify({
          type: 'subscribe',
          event: 'floor_price',
          collection
        }));
      });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'nft_sale') {
          addSale(data.payload as NFTSaleEvent);
        } else if (data.type === 'floor_price') {
          updateFloorPrice(data.payload as FloorPriceUpdate);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [collections, addSale, updateFloorPrice]);
}