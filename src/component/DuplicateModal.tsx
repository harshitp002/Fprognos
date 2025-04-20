import React, { useState } from "react";

interface DuplicateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDuplicate: (strategyName: string, broker: string, days: string[]) => void;
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DuplicateModal: React.FC<DuplicateModalProps> = ({
  isOpen,
  onClose,
  onDuplicate,
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [strategyName, setStrategyName] = useState("");
  const [broker, setBroker] = useState("");

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = () => {
    onDuplicate(strategyName, broker, selectedDays);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-opacity-40 backdrop-blur-[2px] flex justify-center items-center">
      <div className="bg-white w-[400px] rounded-lg shadow-xl p-6">
        <h2 className="ttext-lg font-semibold mb-4">Duplicate Strategy</h2>

        <div className="flex gap-2 mb-4">
          {weekdays.map((day) => (
            <label key={day} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => handleDayToggle(day)}
                className="form-checkbox"
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Strategy Name</label>
          <input
            type="text"
            value={strategyName}
            onChange={(e) => setStrategyName(e.target.value)}
            className="w-full border border-blue-500 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Broker</label>
          <select
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
            className="w-full border border-blue-500 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select a broker</option>
            <option value="Zerodha">Zerodha</option>
            <option value="IIFL">IIFL</option>
            <option value="Upstox">Upstox</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full"
          >
            Duplicate
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateModal;

