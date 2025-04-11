import React from 'react';
import { Plus, ChevronDown } from "lucide-react";

export const TopNav = () => {
  return (
    <div className="w-full">
      {/* Top Gradient Bar */}
      <div className="h-6 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600" />

      {/* Main Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-red-600 text-white font-bold text-lg flex items-center justify-center rounded-md">
            P
          </div>
          <h1 className="text-3xl font-semibold text-blue-700">Fprognos</h1>
        </div>


        {/* Market Indexes */}
        <div className="flex items-center text-sm font-medium text-gray-700">
          {[
            { name: "NIFTY", value: "23,033.20", change: "+0.38%" },
            { name: "BANKNIFTY", value: "49,727.20", change: "-1.23%" },
            { name: "FINNIFTY", value: "23,733.20", change: "+0.35%" },
            { name: "MIDCPNIFTY", value: "99,033.20", change: "-0.11%" },
            { name: "SENSEX", value: "76,249.49", change: "-0.37%" },
          ].map((index, i, arr) => (
            <div key={index.name} className="flex items-center">
              {/* left vertical line only for first item */}
              {i === 0 && <div className="h-12 w-px bg-gray-300 mr-2" />}

              <div className="flex flex-col px-3">
                <span className="font-semibold">{index.value}
                  <span
                    className={`ml-1 ${index.change.startsWith("-")
                      ? "text-red-500"
                      : "text-green-600"
                      }`}
                  >
                    ({index.change})
                  </span>
                </span>
                <span className="text-xs text-gray-500">{index.name}</span>
              </div>

              {/* Divider (only between items, not after last) */}
              {i <= arr.length - 1 && <div className="h-12 w-px bg-gray-300" />}
            </div>
          ))}
        </div>


        {/* Buy Coin + User Info */}
        <div className="flex items-center gap-4">
          {/* Buy Coin Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
            <Plus size={14} />
            Buy Coin
          </button>
          {/* Profile + Dropdown */}
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-12 h-12 mr-4 rounded-full object-cover border-2 border-gray-200"
            />

            <div className="flex flex-col leading-tight mr-8">
              <span className="font-medium">Atul</span>
              <span className="text-sm text-gray-500">Admin</span>
            </div>

            <div className="text-gray-500 border border-gray-300 rounded-full bg-gray-100">
            <ChevronDown size={14} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
