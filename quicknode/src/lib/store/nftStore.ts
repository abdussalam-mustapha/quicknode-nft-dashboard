import { create } from 'zustand';
import { NFTSaleEvent, FloorPriceUpdate } from '../streams/types';
import { NFTMetadata, PriceEstimate } from '../functions/types';

interface NFTStore {
  collections: string[];
  sales: NFTSaleEvent[];
  floorPrices: Record<string, string>;
  metadata: Record<string, NFTMetadata>;
  priceEstimates: Record<string, PriceEstimate>;
  setCollections: (collections: string[]) => void;
  addSale: (sale: NFTSaleEvent) => void;
  updateFloorPrice: (update: FloorPriceUpdate) => void;
  setMetadata: (collection: string, metadata: NFTMetadata) => void;
  setPriceEstimate: (collection: string, estimate: PriceEstimate) => void;
}

export const useNFTStore = create<NFTStore>((set) => ({
  collections: [],
  sales: [],
  floorPrices: {},
  metadata: {},
  priceEstimates: {},
  setCollections: (collections) => set({ collections }),
  addSale: (sale) => set((state) => ({ 
    sales: [sale, ...state.sales].slice(0, 100)
  })),
  updateFloorPrice: (update) => set((state) => ({
    floorPrices: { ...state.floorPrices, [update.collection]: update.floorPrice }
  })),
  setMetadata: (collection, metadata) => set((state) => ({
    metadata: { ...state.metadata, [collection]: metadata }
  })),
  setPriceEstimate: (collection, estimate) => set((state) => ({
    priceEstimates: { ...state.priceEstimates, [collection]: estimate }
  }))
}));