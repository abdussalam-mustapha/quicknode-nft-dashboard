export const COLLECTIONS = [
  '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', // BAYC
  '0x60e4d786628fea6478f785a6d7e704777c86a7c6', // MAYC
] as const;

export const ENV = {
  QUICKNODE_HTTP_URL: import.meta.env.VITE_QUICKNODE_HTTP_URL,
  QUICKNODE_WSS_URL: import.meta.env.VITE_QUICKNODE_WSS_URL,
} as const;