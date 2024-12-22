import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTransactionsByAddress } from '../../lib/api/market';

interface MarketStatsProps {
  collection: string;
}

export const MarketStats: React.FC<MarketStatsProps> = ({ collection }) => {
  const { data: transactions, error } = useQuery({
    queryKey: ['transactions', collection],
    queryFn: () => fetchTransactionsByAddress(collection),
  });

  if (error) {
    return <div className="text-red-500">Error loading transactions</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div className="text-gray-100">No transactions available</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Transactions</h3>
      <ul className="space-y-2">
        {transactions.map((tx, index) => (
          tx && (
            <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">{tx.transaction.signatures[0]}</span>
              <span className="text-sm font-medium text-blue-600">{tx.transaction.message.instructions[0].data}</span>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};