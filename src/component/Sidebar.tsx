import React from 'react';
import { Plus, LayoutGrid, Bell, BarChart2 } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="w-16 bg-white shadow-lg flex flex-col items-center py-4 gap-6">
      <button className="hover:text-blue-500" title="Add"><Plus size={20} /></button>
      <button className="hover:text-blue-500" title="Dashboard"><LayoutGrid size={20} /></button>
      <button className="hover:text-blue-500" title="Notifications"><Bell size={20} /></button>
      <button className="hover:text-blue-500" title="Analytics"><BarChart2 size={20} /></button>
    </div>
  );
};

