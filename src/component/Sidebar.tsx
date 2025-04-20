import React, { useState } from 'react';
import { Plus, LayoutGrid, BarChart2, Bell, FileBarChart2, BookOpenCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const icons = [
  { id: 'instructions', icon: <BookOpenCheck size={20} />, title: 'Instructions' },
  { id: 'add', icon: <Plus size={20} />, title: 'Add' },
  { id: 'dashboard', icon: <LayoutGrid size={20} />, title: 'Dashboard' },
  { id: 'analytics', icon: <BarChart2 size={20} />, title: 'Analytics' },
  { id: 'notifications', icon: <Bell size={20} />, title: 'Notifications' },
  { id: 'reports', icon: <FileBarChart2 size={20} />, title: 'Reports' },
];

export const Sidebar = () => {
  const [active, setActive] = useState('add');
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="mt-1 bg-blue-50">
      <div className="w-16 h-full bg-white shadow-lg flex flex-col items-center py-4 gap-10">
        {icons.map(({ id, icon, title }) => {
          const isActive = active === id;
          const isHovered = hovered === id;

          return (
            <button
              key={id}
              onClick={() => {
                setActive(id);
                if (id === 'instructions') navigate('/instructions'); // 👈 Route to new page
              }}
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



