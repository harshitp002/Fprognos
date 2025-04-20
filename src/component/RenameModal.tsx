import React from "react";

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategyName: string;
  onRename: (newName: string) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({
  isOpen,
  onClose,
  strategyName,
  onRename,
}) => {
  const [inputValue, setInputValue] = React.useState(strategyName);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg relative">
        <div className="text-lg font-semibold mb-4">
          Rename Strategy
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm text-gray-600">Strategy Name</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
            placeholder="Enter strategy name"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => onRename(inputValue)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Rename
          </button>
        </div>

      </div>
    </div>
  );
};

export default RenameModal;
