export interface NFTSaleEvent {
  collection: string;
  tokenId: string;
  price: string;
  seller: string;
  buyer: string;
  timestamp: number;
}

export interface FloorPriceUpdate {
  collection: string;
  floorPrice: string;
  timestamp: number;
}

export interface StreamsConfig {
  collections: string[];
  network: string;
}