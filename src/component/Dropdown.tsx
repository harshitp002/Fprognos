import React, { useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const data = [
  { id: 1, name: 'HFL - 9939389', pnl: -3839390 },
  { id: 2, name: 'HFL - 9939389', pnl: 3839390 },
  { id: 3, name: 'HFL - 9939389', pnl: -3839390 },
  { id: 4, name: 'HFL - 9939389', pnl: 3839390 },
  { id: 5, name: 'HFL - 9939389', pnl: -3839390 },
  { id: 6, name: 'HFL - 9939389', pnl: 3839390 },
  { id: 7, name: 'HFL - 9939389', pnl: -3839390 },
  { id: 8, name: 'HFL - 9939389', pnl: -3839390 },
  { id: 9, name: 'HFL - 9939389', pnl: 3839390 },
  { id: 10, name: 'HFL - 9939389', pnl: -3839390 },
  { id: 11, name: 'HFL - 9939389', pnl: 3839390 },
  { id: 12, name: 'HFL - 9939389', pnl: -3839390 },
];

export const DropdownList = () => {
  const scrollRef = useRef(null);

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -100, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-40 mx-auto rounded shadow-lg bg-white">
      {/* Top Scroll Button */}
      <div className="flex justify-center cursor-pointer py-2" onClick={scrollUp}>
        <ChevronUp size={20} />
      </div>

      {/* Scrollable List */}
      <div
        ref={scrollRef}
        className="space-y-1 px-2 pb-2 max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        {data.map((item, idx) => (
          <div
            key={item.id}
            className={`p-1 rounded ${idx === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100'} shadow-sm`}
          >
            <div>{item.name}</div>
            <div
              className={`text-sm font-semibold ${
                item.pnl < 0 ? 'text-red-500' : 'text-green-600'
              }`}
            >
              PNL - ₹{Math.abs(item.pnl).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Scroll Button */}
      <div className="flex justify-center cursor-pointer py-2" onClick={scrollDown}>
        <ChevronDown size={20} />
      </div>
    </div>
  );
};
