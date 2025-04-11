import React from 'react';
import { Settings } from 'lucide-react';

interface CardProps {
  id: string;
  pnl: number;
}

export const Card = ({ id, pnl }: CardProps) => {
  return (
    <div className="relative bg-white shadow p-4 rounded w-48">
      {/* Settings Button */}
      <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <Settings className="w-4 h-4" />
      </button>

      {/* ID */}
      <h4 className="text-sm mb-1">{id}</h4>

      {/* PNL Line */}
      <div className="text-sm font-medium text-gray-600">
        PNL – <span className={`text-lg font-bold ${pnl > 0 ? 'text-green-500' : 'text-red-500'}`}>
          ₹{pnl.toLocaleString()}
        </span>
      </div>

      {/* Target & Stop Loss */}
      <div className="mt-1 text-blue-500 text-xs space-y-2">
        <div>Target →</div>
        <div>Stop Loss →</div>
      </div>
    </div>
  );
};

