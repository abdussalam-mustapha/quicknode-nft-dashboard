export interface FunctionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface PriceEstimate {
  estimatedPrice: string;
  confidence: number;
  comparables: Array<{
    tokenId: string;
    price: string;
    soldAt: number;
  }>;
}