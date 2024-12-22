import { Solana } from '@quicknode/sdk';

// Initialize a connection to the Solana mainnet using QuickNode SDK
export const solanaEndpoint = new Solana({
  endpointUrl: "https://ultra-restless-dawn.solana-mainnet.quiknode.pro/bd2faace293f20dc15ba463d0228eac497cc8fdc",
});

(async () => {
  try {
    const slot = await solanaEndpoint.connection.getSlot();
    console.log('Current slot:', slot);
  } catch (error) {
    console.error('Error fetching slot:', error);
  }
})();

export default solanaEndpoint;        