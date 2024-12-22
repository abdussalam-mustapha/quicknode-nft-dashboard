import React from 'react';
import { useNFTStore } from '../lib/store/nftStore';
import { useNFTStream } from '../hooks/useNFTStream';
import { COLLECTIONS } from '../lib/config/constants';
import FloorPriceCard from '../components/FloorPriceCard';
import NFTSalesList from '../components/NFTSalesList';
import PriceChart from '../components/charts/PriceChart';
import { MarketStats } from '../components/analytics/MarketStats';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const queryClient = new QueryClient();

const Overview: React.FC = () => {
  const { setCollections } = useNFTStore();
  
  React.useEffect(() => {
    setCollections(COLLECTIONS);
  }, [setCollections]);

  useNFTStream(COLLECTIONS);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 to-blue-500 p-6 w-[100%]">
        <motion.div 
          className="space-y-6 flex-1"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-white">NFT Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((collection) => (
              <motion.div 
                key={collection} 
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }} 
                transition={{ duration: 0.3 }}
              >
                <FloorPriceCard collection={collection} />
              </motion.div>
            ))}
          </div>

          {COLLECTIONS.map((collection) => (
            <div key={collection} className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Collection: {collection}
              </h2>
              <MarketStats collection={collection} />
              <PriceChart collection={collection} />
            </div>
          ))}

          <NFTSalesList />
        </motion.div>
      </div>
    </QueryClientProvider>
  );
};

export default Overview;