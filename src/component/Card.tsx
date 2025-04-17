import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import ClientSettingModal from './ClientSettingModal';

interface CardProps {
  id: string;
  pnl: number;
  selected?: boolean;
  onSelect?: () => void;
}

export const Card = ({ id, pnl, selected = false, onSelect }: CardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState('');
  const [stoploss, setStoploss] = useState('');

  const handleSave = (target: string, stoploss: string) => {
    console.log('Saved for:', id, 'Target:', target, 'Stoploss:', stoploss);
    setShowModal(false);
  };

  return (
    <>
      <div
        onClick={onSelect}
        className={`
          relative bg-white p-4 rounded w-48 cursor-pointer transition-transform duration-200
          ${selected ? 'border-2 border-red-500' : 'border border-gray-200'}
          hover:scale-115 hover:shadow-lg hover:bg-blue-50
        `}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <Settings className="w-4 h-4" />
        </button>

        <h4 className="text-sm mb-1">{id}</h4>

        <div className="text-sm font-medium text-gray-600">
          PNL –{' '}
          <span className={`text-lg font-bold ${pnl > 0 ? 'text-green-500' : 'text-red-500'}`}>
            ₹{Math.abs(pnl).toLocaleString()}
          </span>
        </div>

        <div className="mt-1 text-blue-500 text-xs space-y-2">
          <div>Target →</div>
          <div>Stop Loss →</div>
        </div>
      </div>

      <ClientSettingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        target={target}
        stoploss={stoploss}
        setTarget={setTarget}
        setStoploss={setStoploss}
      />
    </>
  );
};
