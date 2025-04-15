import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Card } from '../../Card';
import { AlgoTable } from './AlgoTable';
import TopFilterBar from './FilterBar';
import StrategyPanel from '../../Strategy';

interface DropdownCard {
  id: number;
  name: string;
  pnl: number;
}

interface MainContentProps {
  selectedCards: DropdownCard[];
}

const handleIconClick = (
  mode: "view" | "edit" | "copy" | "delete",
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalMode: React.Dispatch<React.SetStateAction<"view" | "edit" | "copy" | "delete">>
) => {
  console.log(`${mode} action triggered.`);
  setModalMode(mode);
  setIsModalOpen(true);
};

export const MainContent = ({ selectedCards }: MainContentProps) => {
  const { totalPNL } = useSelector((state: RootState) => state.dashboard);
  const [selectedDay, setSelectedDay] = useState("Thursday");
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [modalMode, setModalMode] = useState<"view" | "edit" | "copy" | "delete">("view");

  return (
    <div className="flex-1 p-4 space-y-6 overflow-auto">
      {/* Selected Cards */}
      <div className="overflow-x-auto scroll-smooth no-scrollbar">
        <div className="flex gap-4 mb-6 min-w-max">
          {selectedCards.map((card) => (
            <Card key={card.id} id={card.name} pnl={card.pnl} />
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <TopFilterBar
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
        totalPNL={`₹${totalPNL.toLocaleString()}`}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {/* Algo Table */}
      <AlgoTable onIconClick={(mode) => handleIconClick(mode, setIsModalOpen, setModalMode)} />

      {/* Strategy Panel Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto">
          <div className="flex justify-center items-center w-full">
            <StrategyPanel mode={modalMode} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

    </div>
  );
};
