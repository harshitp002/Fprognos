import React, { useState } from 'react';
import { Settings, Search, X } from 'lucide-react';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const columnOptions = ["CLIENTID", "ALGO_STATUS", "DURATION", "INFO"];

interface TopFilterBarProps {
  selectedDay?: string;
  onDayChange?: (day: string) => void;
  totalPNL?: string;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  visibleColumns?: string[];
  onToggleColumn?: (column: string) => void;
}

const TopFilterBar: React.FC<TopFilterBarProps> = ({
  selectedDay = "Thursday",
  onDayChange = () => { },
  totalPNL = "₹ 37387.90",
  onSearchChange = () => { },
  searchValue = "",
  visibleColumns = columnOptions,
  onToggleColumn = () => { },
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleCheckboxChange = (column: string) => {
    onToggleColumn(column);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Day Selector */}
          <select
            value={selectedDay}
            onChange={(e) => onDayChange(e.target.value)}
            className="bg-white rounded px-4 py-2 shadow border text-sm"
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>

          {/* Total PNL Label and Value */}
          <div className="text-xs font-medium text-[#4B3B8C]  px-5 py-2 bg-white rounded-3xl shadow-sm border border-gray-200">Total P&L</div>
          <div className="bg-white text-[#E73636]  rounded-xl px-4 py-1">
            {totalPNL}
          </div>

          {/* Settings Button */}
          <button
            className="p-2 rounded-full bg-white shadow"
            onClick={() => setShowSettings(prev => !prev)}
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border border-gray-300 px-4 py-2 pr-10 rounded-lg shadow-sm text-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Settings Popup */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40 backdrop-blur-[2px] ">
          <div className="bg-white rounded-lg p-5 w-72 shadow-xl relative flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold mb-2">Table Setting</h2>
            </div>
            <div className="block mb-2 text-sm text-gray-600">Column Show/Hide</div>
            {columnOptions.map((col) => (
              <div key={col} className="flex items-center pl-6 mb-1 text-gray-600 ">
                <input
                  type="checkbox"
                  id={col}
                  checked={visibleColumns.includes(col)}
                  onChange={() => handleCheckboxChange(col)}
                  className="mr-2"
                />
                <label htmlFor={col} className="text-sm">{col}</label>
              </div>
            ))}
            <button
              className="mt-auto self-end text-white px-5 py-2 text-base bg-blue-600 hover:bg-blue-700 rounded-full"
              onClick={() => setShowSettings(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopFilterBar;
