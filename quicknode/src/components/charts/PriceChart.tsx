import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { useNFTStore } from '../../lib/store/nftStore';

interface PriceChartProps {
  collection: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ collection }) => {
  const sales = useNFTStore((state) => 
    state.sales.filter(sale => sale.collection === collection)
  );

  const data = sales.map(sale => ({
    time: format(new Date(sale.timestamp * 1000), 'HH:mm'),
    price: parseFloat(sale.price)
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;