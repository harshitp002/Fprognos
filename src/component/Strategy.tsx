import React, { useState } from 'react';
import { Plus, X, Trash2, Info } from 'lucide-react';

interface StrategyPanelProps {
    mode: "view" | "edit" | "copy" | "delete";
    onClose: () => void;
}

const StrategyPanel = ({ mode, onClose }: StrategyPanelProps) => {

    const [selectedDays, setSelectedDays] = useState(['Monday']);
    const [strategyName, setStrategyName] = useState('Testing2');
    const [target, setTarget] = useState(1000);
    const [stoploss, setStoploss] = useState(1000);

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const toggleDay = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const statuses = [
        { label: "IIFL API: Not Running", color: "bg-red-400" },
        { label: "Live Feed: Not Running", color: "bg-red-400" },
        { label: "Algo: Running", color: "bg-green-500" },
    ];

    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
    const minutes = ['00', '15', '30', '45']

    return (
        <div className="w-[1250px] h-[650px] overflow-y-auto bg-white rounded-md shadow text-sm ">
            {/* Title */}
            <div className="h-16  bg-blue-400  flex justify-between items-center p-4  ">
                <h2 className="text-2xl font-semibold text-white">STRATEGY</h2>
                <button
                    className="text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    <X className="h-6 w-6" />
                </button>
            </div>

            <div className="flex justify-between items-start flex-wrap gap-4 p-4">
                {/* Days Selection */}
                <div className="flex flex-wrap gap-2">
                    {weekdays.map((day) => (
                        <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`px-2 py-2 rounded-lg text-sm font-medium border ${selectedDays.includes(day)
                                ? 'bg-blue-400 text-white'
                                : 'bg-blue-100 border-gray-300 text-gray-600'
                                }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Status Indicators */}
                <div className="flex gap-2 flex-wrap">
                    {statuses.map((s, idx) => (
                        <span
                            key={idx}
                            className={`${s.color} text-white px-2 py-2 rounded-lg text-sm font-medium border `}
                        >
                            {s.label}
                        </span>
                    ))}
                </div>
            </div>


            {/* 2. Strategy Settings */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border border-gray-300 border-1  p-4 m-4 rounded-xl  ">
                <div className="flex flex-col">
                    <label className="text-md font-medium text-gray-700">Product</label>
                    <select className="border border-gray-300 bg-gray-100 p-2 rounded-md text-sm">
                        <option>INTRADAY</option>
                        <option>DELIVERY</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-md font-medium text-gray-700">Expiry</label>
                    <select className="border border-gray-300 bg-gray-100 p-2 rounded-md text-sm">
                        <option>WEEKLY</option>
                        <option>MONTHLY</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-md font-medium text-gray-700">Exchange</label>
                    <select className="border border-gray-300 bg-gray-100 p-2 rounded-md text-sm">
                        <option>NSE</option>
                        <option>BSE</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-md font-medium text-gray-700">Order Type</label>
                    <select className="border border-gray-300 bg-gray-100 p-2 rounded-md text-sm">
                        <option>MARKET</option>
                        <option>LIMIT</option>
                    </select>
                </div>
            </div>


            {/* Checkboxes Row */}
            <div className="p-4 space-y-8 font-medium text-gray-600 text-base">
                <div className="flex justify-center mt-4 gap-x-8">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>SquareOff All Leg</span>
                        <Info className="w-4 h-4 text-blue-500" />
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" defaultChecked />
                        <span>SquareOff One Leg</span>
                        <Info className="w-4 h-4 text-blue-500" />
                    </label>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Wait For Momentum</span>
                        <Info className="w-4 h-4 text-blue-500" />
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Re-Entry / Re-Execute</span>
                        <Info className="w-4 h-4 text-blue-500" />
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Move SL to Cost</span>
                        <Info className="w-4 h-4 text-blue-500" />
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Range Breakout</span>
                        <Info className="w-4 h-4 text-blue-500" />
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Protect Profit</span>
                        <Info className="w-4 h-4 text-blue-500" />
                    </label>
                </div>
            </div>

            {/* Target / Stoploss */}
            <div className="flex justify-center gap-12 my-4">
                <div className="flex items-center gap-2">
                    <span className="text-md">Target</span>
                    <div className="relative">
                        <input
                            type="text"
                            className="border rounded-md pl-2 pr-8 py-2 w-32 bg-gray-50"
                            placeholder=""
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-md">Stoploss</span>
                    <div className="relative">
                        <input
                            type="text"
                            className="border rounded-md pl-2 pr-8 py-2 w-32 bg-gray-50"
                            placeholder=""
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>


            {/* Strategy Name + Add Log */}
            <div className="flex gap-4 px-4 my-4">
                <input
                    type="text"
                    placeholder="Strategy Name"
                    value={strategyName}
                    onChange={(e) => setStrategyName(e.target.value)}
                    className="border rounded-md p-2 "
                />

                <select className="border rounded-md p-2 w-32">
                    <option>NIFTY</option>
                    <option>BANKNIFTY</option>
                    <option>FINNIFTY</option>
                </select>

                <button className="bg-blue-500 text-white rounded-md p-2 w-32">
                    OPTION
                </button>

                <button className="bg-blue-500 text-white rounded-md p-2 w-32">
                    Add Leg
                </button>
            </div>

            {/* Logs Table (Simplified Version) */}
            <div className="overflow-x-auto rounded-lg border border-gray-300 p-4 m-4 ">
                <table className="table-auto w-full text-center text-sm">
                    <thead>
                        <tr className="bg-white border border-gray-300 bg-white font-extrabold text-lg text-gray-700">
                            <th className='border border-gray-300 bg-white'>Lot</th>
                            <th className='border border-gray-300 bg-white'>Entry Choice</th>
                            <th className='border border-gray-300 bg-white'>Action</th>
                            <th className='border border-gray-300 bg-white'>Symbol</th>
                            <th className='border border-gray-300 bg-white'>Expiry</th>
                            <th className='border border-gray-300 bg-white'>Target</th>
                            <th className='border border-gray-300 bg-white'>Stoploss</th>
                            <th className='border border-gray-300 bg-white'>TrailStoploss</th>
                            <th className='border border-gray-300 bg-white'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* Lot */}
                            <td>
                                <div className="flex flex-col items-center gap-1 p-1">
                                    <div className='w-full flex flex-row gap-2'>
                                        <span className="text-md bg-gray-100 w-1/2 h-8 py-1 rounded-md font-medium ">1</span>
                                        <span className="text-md bg-gray-100 w-1/2 h-8 py-1 rounded-md font-medium ">(x75)</span>
                                    </div>
                                    <button className="w-full h-8 text-md bg-gray-100 px-2 py-1 rounded-md font-medium">
                                        INTRADAY
                                    </button>
                                </div>
                            </td>

                            {/* Entry Choice */}
                            <td>
                                <div className=" flex flex-col items-center gap-1 p-1 w-full">
                                    <select className="w-full h-8 text-md bg-gray-100 px-2 py-1 rounded-md font-medium">
                                        <option>ATM Point</option>
                                    </select>
                                    <div className='w-full flex flex-row gap-2'>
                                        <button className="text-md bg-gray-100 w-1/2 h-8 py-1 rounded-md font-medium">ATM</button>
                                        <button className="text-md bg-gray-100 w-1/2 h-8 py-1 rounded-md font-medium">ATM+200</button>
                                    </div>
                                </div>
                            </td>

                            {/* Action */}
                            <td>
                                <div className="flex flex-col items-center gap-1 p-1">
                                    <button className="w-full rounded-md bg-red-500 px-2 py-1 text-white font-semibold">SELL</button>
                                    <button className="w-full rounded-md bg-green-500 px-2 py-1 text-white font-semibold">CALL</button>
                                </div>
                            </td>

                            {/* Symbol */}
                            <td>
                                <div className="flex flex-col items-center gap-1 p-1">
                                    <button className="w-full rounded-md bg-blue-200 px-3 py-1 text-blue-700 font-semibold">N</button>
                                </div>
                            </td>

                            {/* Expiry */}
                            <td>
                                <div className="flex flex-col items-center gap-1 p-1">
                                    <select className="w-full h-8 text-md bg-gray-100 px-2 py-1 rounded-md font-medium">
                                        <option>WEEKLY</option>
                                    </select>
                                </div>
                            </td>

                            {/* Target */}
                            <td>
                                <div className="flex items-center justify-center h-full">
                                    <button className="flex items-center justify-center h-8 w-8 text-blue-500  hover:text-blue-700">
                                        <Plus size={24} strokeWidth={3} />
                                    </button>
                                </div>
                            </td>

                            {/* Stoploss */}
                            <td>
                                <div className="flex items-center justify-center h-full">
                                    <button className="flex items-center justify-center h-8 w-8 text-blue-500  hover:text-blue-700">
                                        <Plus size={24} strokeWidth={3} />
                                    </button>
                                </div>
                            </td>

                            {/* TrailStoploss */}
                            <td>
                                <div className="flex items-center justify-center h-full">
                                    <button className="flex items-center justify-center h-8 w-8 text-blue-500  hover:text-blue-700">
                                        <Plus size={24} strokeWidth={3} />
                                    </button>
                                </div>
                            </td>

                            {/* Delete Action */}
                            <td>
                                <div className="flex items-center justify-center h-full">
                                    <button className="flex items-center justify-center h-8 w-8 text-red-500  hover:text-red-700">
                                        <Trash2 size={24} strokeWidth={3} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            {/* Time Selectors */}
            <div className="rounded-lg border border-gray-300 p-4 m-4 flex justify-center items-start gap-16">
                {/* Start Time */}
                <div className="flex flex-col items-start space-y-2">
                    <label className="text-base font-normal ">Start Time</label>
                    <div className="flex items-center space-x-2">
                        <select className="border  rounded-md h-10 w-24 px-2 py-1 text-sm">
                            {hours.map((hour) => (
                                <option key={`start-hour-${hour}`} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                        <span className="text-lg font-semibold">:</span>
                        <select className="border rounded-md h-10 w-24 px-2 py-1 text-sm">
                            {minutes.map((minute) => (
                                <option key={`start-minute-${minute}`} value={minute}>
                                    {minute}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* End Time */}
                <div className="flex flex-col items-start space-y-2">
                    <label className="text-base font-normal ">End Time</label>
                    <div className="flex items-center space-x-2">
                        <select className="border rounded-md h-10 w-24 px-2 py-1 text-sm">
                            {hours.map((hour) => (
                                <option key={`end-hour-${hour}`} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                        <span className="text-lg font-semibold">:</span>
                        <select className="border rounded-md h-10 w-24 px-2 py-1 text-sm">
                            {minutes.map((minute) => (
                                <option key={`end-minute-${minute}`} value={minute}>
                                    {minute}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

           <div className="rounded-lg border border-gray-300 p-4 m-4">
           </div>

            {/* Bottom Buttons */}
            <div className="flex justify-between p-4">
                <button className="bg-blue-600 text-white px-4 py-1 rounded">Modify Strategy</button>
            </div>

            {/* Close Button */}
            <div className="mt-6 bg-blue-400 h-12 flex justify-end items-center px-4">
                <button
                    onClick={onClose}
                    className="bg-white text-blue-400 px-4 py-2 w-24 rounded-lg hover:text-blue-900"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default StrategyPanel;