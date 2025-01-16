import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserGrowthChartProps {
  data: Array<{
    date: string;
    count: number;
  }>;
}

const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="count" 
          stroke="#5EA669" 
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserGrowthChart;