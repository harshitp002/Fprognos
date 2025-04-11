import React from 'react';

type CardProps = {
  id: string;
  pnl: number;
};

export const Card = ({ id, pnl }: CardProps) => {
  return (
    <div className="bg-white shadow p-4 rounded w-64">
      <h4 className="text-sm">{id}</h4>
      <p className={`text-lg font-bold ${pnl > 0 ? 'text-green-500' : 'text-red-500'}`}>
        PNL – ₹{pnl.toLocaleString()}
      </p>
      <div className="flex justify-between mt-2 text-blue-500 text-sm">
        <span>Target →</span>
        <span>Stop Loss →</span>
      </div>
    </div>
  );
};
