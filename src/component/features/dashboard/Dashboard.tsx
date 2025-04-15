import React, { useState } from 'react';
import { Sidebar } from '../../Sidebar';
import { TopNav } from '../../Navbar';
import { MainContent } from './MainContent';
import { DropdownList } from '../../Dropdown';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DropdownCard {
  id: number;
  name: string;
  pnl: number;
}

export const Dashboard = () => {
  const [selectedCards, setSelectedCards] = useState<DropdownCard[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const dropdownWidth = 160; // Width of the dropdown in pixels (w-40 = 160px)

  const handleCardToggle = (card: DropdownCard) => {
    const modifiedCard = {
      ...card,
      name: card.name.replace("HFL", "IIFL"), // Replace "HFL" with "IIFL"
    };

    setSelectedCards((prev) => {
      const isAlreadySelected = prev.some((c) => c.id === modifiedCard.id);
      return isAlreadySelected
        ? prev.filter((c) => c.id !== modifiedCard.id)
        : [...prev, modifiedCard];
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <TopNav />
      <div className="flex flex-1 overflow-hidden bg-blue-50 relative">
        <Sidebar />
        
        {/* Main Content */}
        <MainContent selectedCards={selectedCards} />
        
        {/* Toggle Button */}
        <button
          onClick={toggleDropdown}
          className="absolute top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-l-md p-2 z-10"
          style={{
            right: isDropdownOpen ? `${dropdownWidth}px` : '0',
            transition: 'right 0.3s ease-in-out'
          }}
        >
          {isDropdownOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        
        {/* Dropdown List Component */}
        <DropdownList
          onCardSelect={handleCardToggle}
          selectedCards={selectedCards}
          className="absolute right-0 top-0 h-full transition-all duration-300 ease-in-out"
          style={{ 
            transform: isDropdownOpen ? 'translateX(0)' : 'translateX(100%)'
          }}
        />
      </div>
    </div>
  );
};