import { solanaEndpoint } from '../quicknode';

export async function fetchTransactionsByAddress(walletAddress: string) {
  try {
    const response = await solanaEndpoint.connection.getTransactions([walletAddress]);

    if (!response) {
      throw new Error('No transactions returned from API');
    }

    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return null;
  }
}

// Example usage
fetchTransactionsByAddress("0xD10E24685c7CDD3cd3BaAA86b09C92Be28c834B6");