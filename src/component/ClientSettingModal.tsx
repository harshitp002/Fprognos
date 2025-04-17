import React from 'react';

interface ClientSettingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (target: string, stoploss: string) => void;
    target: string;
    stoploss: string;
    setTarget: (value: string) => void;
    setStoploss: (value: string) => void;
}

const ClientSettingModal: React.FC<ClientSettingModalProps> = ({
    isOpen,
    onClose,
    onSave,
    target,
    stoploss,
    setTarget,
    setStoploss,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-xl relative">
                <h2 className="text-lg font-semibold mb-4">Client Setting</h2>

                <label className="block mb-2 text-sm text-gray-600">Target</label>
                <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
                    placeholder="Enter target"
                />

                <label className="block mb-2 text-sm text-gray-600">Stoploss</label>
                <input
                    type="text"
                    value={stoploss}
                    onChange={(e) => setStoploss(e.target.value)}
                    className="w-full border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-6"
                    placeholder="Enter stoploss"
                />

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => onSave(target, stoploss)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full"
                    >
                        Save
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

export default ClientSettingModal;

