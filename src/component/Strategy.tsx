import React, { useState } from 'react';
import { Plus, X, Trash2, Info } from 'lucide-react';

interface StrategyPanelProps {
    mode: "view" | "edit" | "copy" | "delete";
    onClose: () => void;
}

const StrategyPanel = ({ mode, onClose }: StrategyPanelProps) => {

    const [selectedDays, setSelectedDays] = useState(['Monday']);
    const [targetValue, setTargetValue] = useState("");
    const [stoplossValue, setStoplossValue] = useState("");

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const toggleDay = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const statuses = [
        { label: "IIFL API: Not Running", color: "bg-red-500" },
        { label: "Live Feed: Not Running", color: "bg-green-500" },
        { label: "Algo: Running", color: "bg-green-500" },
    ];

    const rowData = new Array(4).fill({});

    const handleNumberInput = (e, setter) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
    const minutes = ['00', '15', '30', '45']

    return (
        <div className="w-[1250px] h-[650px] overflow-y-auto bg-white rounded-md shadow text-sm ">
            {/* Title */}
            <div className="h-16 flex justify-between items-center  p-4 ">
                <h2 className="text-4xl font-semibold text-blue-800">Strategy</h2>
                <div className="flex gap-2 flex-wrap">
                    {statuses.map((s, idx) => (
                        <span
                            key={idx}
                            className={`${s.color} text-white px-2 py-2 rounded-lg text-lg font-normal border `}
                        >
                            {s.label}
                        </span>
                    ))}
                </div>
            </div>

            <div className=' border border-gray-300 border-1 m-4 rounded-xl'>
                <div className="flex justify-between items-start flex-wrap gap-4 bg-blue-200 pl-4 py-3 rounded-t-xl">
                    {/* Days Selection */}
                    <div className="flex flex-wrap gap-2">
                        {weekdays.map((day) => (
                            <button
                                key={day}
                                onClick={() => toggleDay(day)}
                                className={`px-2 py-2 rounded-lg text-sm font-medium border ${selectedDays.includes(day)
                                    ? 'bg-blue-400 text-white'
                                    : 'bg-blue-100 border-blue-200 text-gray-600'
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
                {/* 2. Strategy Settings */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4 bg-blue-50 rounded-b-xl ">
                    <div className="flex flex-col">
                        <label className="text-md font-semibold text-gray-700">Product</label>
                        <select className="border border-gray-300 bg-gray-100 p-2 rounded-md text-sm font-semibold">
                            <option>INTRADAY</option>
                            <option>DELIVERY</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-md font-semibold text-gray-700">Expiry</label>
                        <select className="border border-gray-300 bg-gray-100 p-2 rounded-md text-sm font-semibold">
                            <option>WEEKLY</option>
                            <option>MONTHLY</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-md font-semibold text-gray-700">Exchange</label>
                        <select className="border border-gray-300 bg-gray-100 p-2 rounded-md text-sm font-semibold">
                            <option>NSE</option>
                            <option>BSE</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-md font-semibold text-gray-700">Order Type</label>
                        <select className="border border-gray-300 bg-gray-100 p-2 rounded-md text-sm font-semibold">
                            <option>MARKET</option>
                            <option>LIMIT</option>
                        </select>
                    </div>
                </div>

            </div>


            {/* Checkboxes Row */}
            <div className="p-1 space-y-8 font-medium text-gray-600 text-base border border-gray-300 border-1 m-4 rounded-xl bg-blue-50">
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
                <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center mb-4">
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
                {/* Target */}
                <div className="flex items-center gap-2">
                    <span className="text-md">Target</span>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={targetValue}
                            onChange={(e) => handleNumberInput(e, setTargetValue)}
                            className="border rounded-md pl-2 py-2 w-32 bg-gray-50"
                            placeholder=""
                        />
                        <button
                            onClick={() => setTargetValue("")}
                            className="text-black-500 font-semibold hover:text-red-700"
                            title="Clear Target"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Stoploss */}
                <div className="flex items-center gap-2">
                    <span className="text-md">Stoploss</span>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={stoplossValue}
                            onChange={(e) => handleNumberInput(e, setStoplossValue)}
                            className="border rounded-md pl-2 py-2 w-32 bg-gray-50"
                            placeholder=""
                        />
                        <button
                            onClick={() => setStoplossValue("")}
                            className="text-black-500 font-semibold hover:text-red-700"
                            title="Clear Stoploss"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Strategy Name + Add Log */}
            <div className="flex items-center gap-4 m-4">
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-3xl">Add Log</button>
                <div className="flex flex-row gap-1">
                    <label className="text-sm font-semibold  text-gray-500 content-center">Strategy Name:</label>
                    <input
                        type="text"
                        maxLength={40}
                        placeholder="Strategy Name (up to 40 characters)"
                        className="border border-gray-300 px-3 py-1 rounded-md text-sm w-[300px] text-gray-600 font-medium bg-gray-100"
                    />
                </div>
            </div>


            {/* Logs Table (Simplified Version) */}
            <div className="overflow-x-auto m-4 border-thin border-gray-300">
                <table className=" table-auto  border mt-4 text-sm text-center">
                    <thead className=" bg-white border border-gray-300 bg-white font-extrabold text-base text-gray-500">
                        <tr >
                            {[
                                "Lot",
                                "Entry Choice",
                                "Variation",
                                "Action",
                                "Option",
                                "Script",
                                "Expiry",
                                "Target",
                                "Stoploss",
                                "Trail Stoploss",
                                "ReEntry Execute",
                            ].map((heading) => (
                                <th key={heading} className="p-2 whitespace-nowrap ">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rowData.map((_, i) => (
                            <tr key={i} >
                                {/* Lot */}
                                <td className="p-2 ">
                                    <input
                                        type="number"
                                        defaultValue={1}
                                        className="border rounded px-1 py-1 w-8 text-center bg-gray-100"
                                    />
                                </td>

                                {/* Entry Choice */}
                                <td className="p-2">
                                    <select className=" border rounded px-2 py-1 bg-gray-100">
                                        <option>ATM Point</option>
                                    </select>
                                </td>


                                {/* Variation */}
                                <td className="p-2">
                                    <select className="border rounded px-2 py-1 bg-gray-100">
                                        <option>ATM</option>
                                    </select>
                                </td>

                                {/* Action */}
                                <td className="p-2 ">
                                    <span className="bg-green-500 text-white px-3 py-2 rounded-full text-xs font-semibold">
                                        BUY
                                    </span>
                                </td>

                                {/* Option */}
                                <td className="p-2 ">
                                    <span className="bg-orange-500 text-white px-3 py-2 rounded-full text-xs font-semibold">
                                        CALL
                                    </span>
                                </td>

                                {/* Script */}
                                <td className="p-2 ">
                                    <span className="bg-cyan-500 text-white px-3 py-2 rounded-full text-xs font-semibold">
                                        BN
                                    </span>
                                </td>

                                {/* Expiry */}
                                <td className="p-2">
                                    <select className="border rounded px-2 py-1 bg-gray-100">
                                        <option>Weekly</option>
                                    </select>
                                </td>

                                {/* Target */}
                                <td className="p-2 ">

                                    <div className="flex items-center gap-2">
                                        <select className="border rounded px-2 py-1">
                                            <option>Point</option>
                                        </select>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={targetValue}
                                                onChange={(e) => handleNumberInput(e, setTargetValue)}
                                                className="border rounded-md pl-2 py-2 w-7 h-7 bg-gray-50"
                                                placeholder=""
                                            />
                                            <button
                                                onClick={() => setTargetValue("")}
                                                className="text-red-500 font-semibold hover:text-red-700"
                                                title="Clear Target"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </td>

                                {/* Stoploss */}
                                <td className=" p-2">
                                <div className="flex items-center gap-2">
                                        <select className="border rounded px-2 py-1">
                                            <option>SL Point</option>
                                        </select>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={stoplossValue}
                                                onChange={(e) => handleNumberInput(e, setStoplossValue)}
                                                className="border rounded-md pl-2 py-2 w-7 h-7 bg-gray-50"
                                                placeholder=""
                                            />
                                            <button
                                                onClick={() => setStoplossValue("")}
                                                className="text-black-500 font-semibold hover:text-black-700"
                                                title="Clear Target"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </td>

                                {/* Trail Stoploss */}
                                <td className=" p-2">
                                <div className="flex items-center gap-2">
                                        <select className="border rounded px-2 py-1">
                                            <option>SL Point</option>
                                        </select>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={stoplossValue}
                                                onChange={(e) => handleNumberInput(e, setStoplossValue)}
                                                className="border rounded-md pl-2 py-2 w-7 h-7 bg-gray-50"
                                                placeholder=""
                                            />
                                            <input
                                                type="text"
                                                value={stoplossValue}
                                                onChange={(e) => handleNumberInput(e, setStoplossValue)}
                                                className="border rounded-md pl-2 py-2 w-7 h-7 bg-gray-50"
                                                placeholder=""
                                            />
                                            <button
                                                onClick={() => setStoplossValue("")}
                                                className="text-black-500 font-semibold hover:text-black-700"
                                                title="Clear Target"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </td>

                                {/* ReEntry Execute */}
                                <td className="p-2 ">
                                    <select className="border rounded px-2 py-1">
                                        <option>Re-Execute</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Time Selectors */}
            <div className="rounded-lg border border-gray-300 p-4 m-4 flex justify-center items-start gap-16 bg-blue-50">
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
        </div >
    );
};

export default StrategyPanel;


