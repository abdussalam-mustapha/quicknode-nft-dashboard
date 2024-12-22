import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useNFTStore } from '../lib/store/nftStore';

interface FloorPriceCardProps {
  collection: string;
}

const FloorPriceCard: React.FC<FloorPriceCardProps> = ({ collection }) => {
  const floorPrice = useNFTStore((state) => state.floorPrices[collection]);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <TrendingUp className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Floor Price
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {floorPrice || '0'} ETH
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloorPriceCard;