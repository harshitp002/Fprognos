import React, { useState } from "react";
import { AlgoTable } from "./AlgoTable";
import StrategyPanel from "../../Strategy";

const AlgoManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "copy" | "delete">("view");

  // Open Modal Logic
  const openModal = (mode: "view" | "edit" | "copy" | "delete") => {
    setModalMode(mode); // Set the mode (view, edit, copy, delete)
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => setIsModalOpen(false); // Close the modal

  return (
    <>
      <AlgoTable onIconClick={openModal} />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>
            {/* Render StrategyPanel with the current mode */}
            <StrategyPanel mode={modalMode} onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default AlgoManager;
