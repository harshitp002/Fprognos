import React from 'react';
import { Sidebar } from '../../Sidebar';
import { TopNav } from '../../Navbar';
import { MainContent } from './MainContent';
import { DropdownList } from '../../Dropdown';

export const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopNav />

      <div className="flex flex-1 overflow-hidden bg-blue-50 relative">
        <Sidebar />
        <MainContent />
        <DropdownList />
      </div>
    </div>
  );
};

