import React, { useState } from 'react';
import { Plus, LayoutGrid, BarChart2, Bell, FileBarChart2 } from 'lucide-react';

const icons = [
  { id: 'add', icon: <Plus size={20} />, title: 'Add' },
  { id: 'dashboard', icon: <LayoutGrid size={20} />, title: 'Dashboard' },
  { id: 'analytics', icon: <BarChart2 size={20} />, title: 'Analytics' },
  { id: 'notifications', icon: <Bell size={20} />, title: 'Notifications' },
  { id: 'reports', icon: <FileBarChart2 size={20} />, title: 'Reports' },
];

export const Sidebar = () => {
  const [active, setActive] = useState('add');
  const [hovered, setHovered] = useState(null);

  return (
    <div className='mt-1 bg-blue-50'>
      <div className="w-16 h-full bg-white shadow-lg flex flex-col items-center py-4 gap-10">
        {icons.map(({ id, icon, title }) => {
          const isActive = active === id;
          const isHovered = hovered === id;

          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className={`p-2 rounded-full transition-colors ${
                isActive
                  ? 'bg-[#EEE7FB] text-[#7B4EF3]'
                  : isHovered
                  ? 'bg-gray-100 text-[#7B4EF3]'
                  : 'text-gray-600'
              }`}
              title={title}
            >
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};


