import React from 'react';
import { Settings, Search } from 'lucide-react';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Define the props with explicit types
interface TopFilterBarProps {
  selectedDay?: string;
  onDayChange?: (day: string) => void;
  totalPNL?: string;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
}

const TopFilterBar: React.FC<TopFilterBarProps> = ({
  selectedDay = "Thursday",
  onDayChange = () => { },
  totalPNL = "₹ 37387.90",
  onSearchChange = () => { },
  searchValue = "",
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Day Selector */}
        <select
          value={selectedDay}
          onChange={(e) => {
            // Extract the value and pass it to onDayChange
            onDayChange(e.target.value);
          }}
          className="bg-white rounded px-4 py-2 shadow border text-sm"
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        {/* Total PNL Label */}
        <div className="text-xs font-medium text-[#4B3B8C]  px-5 py-2 bg-white rounded-3xl shadow-sm border border-gray-200">Total PNL</div>
        {/* Total PNL Value */}
        <div className="bg-white text-[#E73636]  rounded-xl px-4 py-1">
          {totalPNL}
        </div>
        {/* Settings Icon Button */}
        <button
          className="p-2 rounded-full bg-white shadow"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => {
              // Extract the value and pass it to onSearchChange
              onSearchChange(e.target.value);
            }}
            className="border border-gray-300 px-4 py-2 pr-10 rounded-lg shadow-sm text-sm focus:outline-none focus:border-gray-400 transition-colors"
          />
          <Search
            className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

    </div>
  );
};

export default TopFilterBar;

