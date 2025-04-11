import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Card } from '../../Card';
import { Sidebar } from '../../Sidebar';
import { TopNav } from '../../Navbar';

export const Dashboard = () => {
  const { pnlCards, totalPNL } = useSelector((state: RootState) => state.dashboard);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <div className="p-4 space-y-4 bg-blue-50 overflow-auto">
          {/* Cards */}
          <div className="flex gap-4 flex-wrap">
            {pnlCards.map((card, index) => (
              <Card key={index} id={card.id} pnl={card.pnl} />
            ))}
          </div>

          {/* PNL and Table */}
          <div className="flex justify-between items-center">
            <div>
              <select className="border p-2 rounded"> 
                <option>Thursday</option>
              </select>
            </div>
            <div className="text-lg font-bold">
              Total PNL: ₹{totalPNL.toLocaleString()}
            </div>
            <input type="search" placeholder="Search" className="border p-2 rounded w-64" />
          </div>

          {/* Table */}
          <table className="w-full text-sm border mt-4 bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">S.No</th>
                <th>Alert</th>
                <th>Status</th>
                <th>Client ID</th>
                <th>Algo Name</th>
                <th>Info</th>
                <th>MTM</th>
                <th>Duration</th>
                <th>Buy/Sell</th>
                <th>Multiplier</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="text-center">
                  <td>1</td>
                  <td><input type="checkbox" /></td>
                  <td className="text-green-500">↑ Active</td>
                  <td>9902020-IFL</td>
                  <td>Bear Put Spread</td>
                  <td>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">Intraday</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Label</span>
                  </td>
                  <td className="text-red-500">₹0</td>
                  <td>09:15 - 15:15</td>
                  <td className="text-blue-600">BUY/SELL</td>
                  <td>1x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
