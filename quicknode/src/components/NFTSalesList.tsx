import React, { useState, useEffect } from 'react';

interface Sale {
  nftName: string;
  price: number;
  // Add other properties as needed
}

const NFTSalesList = () => {
  const [sales, setSales] = useState<Sale[]>([
    { nftName: 'CryptoPunk #3100', price: 4200 },
    { nftName: 'Bored Ape #1234', price: 150 },
    { nftName: 'Art Blocks #5678', price: 300 },
  ]);

  useEffect(() => {
    const ws = new WebSocket('wss://');
    ws.onmessage = (event) => {
      const newSale: Sale = JSON.parse(event.data);
      setSales((prevSales) => [newSale, ...prevSales]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent NFT Sales</h3>
      <ul className="space-y-2">
        {sales.map((sale, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            {sale.nftName} sold for {sale.price} ETH
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTSalesList;