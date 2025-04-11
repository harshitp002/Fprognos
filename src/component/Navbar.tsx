import React from 'react';

export const TopNav = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" className="h-10" />
        <span className="text-xl font-bold">Fprognos</span>
        {/* Market Stats */}
        <div className="flex gap-4 ml-6 text-sm">
          <span>NIFTY: 23,033.20 <span className="text-green-400">(0.38%)</span></span>
          <span>BANKNIFTY: 49,727.20 <span className="text-red-400">(-1.23%)</span></span>
          {/* Add others... */}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-blue-600 px-4 py-2 rounded">+ Buy Coin</button>
        <div className="flex items-center gap-2">
          <img className="w-8 h-8 rounded-full" src="/user.jpg" alt="User" />
          <div className="text-sm">Atul<br/><span className="text-gray-300">Admin</span></div>
        </div>
      </div>
    </div>
  );
};
