export interface WebhookPayload<T> {
  event: string;
  data: T;
  timestamp: number;
}

export interface TransferEvent {
  from: string;
  to: string;
  tokenId: string;
  value: string;
  contractAddress: string;
  blockNumber: number;
  transactionHash: string;
}

export interface FloorPriceEvent {
  contractAddress: string;
  floorPrice: string;
  marketplace: string;
}