import React, { useState } from 'react';
import { Plus, LayoutGrid, BarChart2, Bell, FileBarChart2 } from 'lucide-react';

const icons = [
  { id: 'add', icon: <Plus size={20} />, title: 'Add' },
  { id: 'dashboard', icon: <LayoutGrid size={20} />, title: 'Dashboard' },
  { id: 'analytics', icon: <BarChart2 size={20} />, title: 'Analytics' },
  { id: 'notifications', icon: <Bell size={20} />, title: 'Notifications' },
  { id: 'reports', icon: <FileBarChart2 size={20} />, title: 'Reports' }
];


export const Sidebar = () => {
  const [active, setActive] = useState('add');

  return (
    <div className='mt-1 bg-blue-50'>
     <div className="w-16 h-full bg-white shadow-lg flex flex-col items-center py-4 gap-10" >
      {icons.map(({ id, icon, title }) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          className={`p-2 rounded-full ${
            active === id ? 'bg-[#EEE7FB] text-[#7B4EF3]' : 'text-gray-600'
          } hover:text-[#7B4EF3] transition-colors`}
          title={title}
        >
          {icon}
        </button>
      ))}
    </div>
    </div>
  );
};


