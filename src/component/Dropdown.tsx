import React, { useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface DropdownItem {
  id: number;
  name: string;
  pnl: number;
}

interface DropdownListProps {
  onCardSelect: (card: DropdownItem) => void;
  selectedCards: DropdownItem[]; // Pass selected cards
  className?: string; // Add className prop
  style?: React.CSSProperties; // Add style prop
}

const data: DropdownItem[] = [
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

export const DropdownList = ({ 
  onCardSelect, 
  selectedCards, 
  className = '',
  style = {}
}: DropdownListProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollUp = () => scrollRef.current?.scrollBy({ top: -100, behavior: 'smooth' });
  const scrollDown = () => scrollRef.current?.scrollBy({ top: 100, behavior: 'smooth' });

  return (
    <div className={`w-40 mx-auto rounded shadow-lg bg-white ${className}`} style={style}>
      {/* Top Scroll Button */}
      <div className="flex justify-center cursor-pointer py-2" onClick={scrollUp}>
        <ChevronUp size={20} />
      </div>

      {/* Scrollable List */}
      <div
        ref={scrollRef}
        className="space-y-1 px-2 pb-2 max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        {data.map((item) => {
          const isSelected = selectedCards.some((c) => c.id === item.id);

          return (
            <div
              key={item.id}
              onClick={() => onCardSelect(item)}
              className={`p-1 rounded cursor-pointer shadow-sm transition-all ${
                isSelected ? 'bg-blue-600 text-white' : ' bg-gray-100 hover:bg-blue-400 hover:text-gray-100'
              }`}
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
          );
        })}
      </div>

      {/* Bottom Scroll Button */}
      <div className="flex justify-center cursor-pointer py-2" onClick={scrollDown}>
        <ChevronDown size={20} />
      </div>
    </div>
  );
};