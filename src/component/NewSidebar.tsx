import React, { useState } from "react";
import {
  Compass,
  Rocket,
  Pencil,
  BarChart2,
  DollarSign,
  Wrench,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  Settings2,
} from "lucide-react";

function Sidebar() {
  const [selectedItem, setSelectedItem] = useState("");
  const [hovered, setHovered] = useState(false);
  const [forceCloseChildren, setForceCloseChildren] = useState(false);

  const brokerChildren = ["Zerodha", "IIFL"];
  const featuresChildren = ["List of All Features"];
  const isSidebarHovered = hovered;

  const handleMouseEnter = () => {
    setHovered(true);
    setForceCloseChildren(false);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setForceCloseChildren(true);
  };

  return (
    <aside
      className={`group h-screen bg-white border-r shadow-md p-4 space-y-2 overflow-y-auto transition-all duration-300 ${
        isSidebarHovered ? "w-64" : "w-20"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-6">
        <img src="/logo.png" alt="FPrognos Logo" className="h-8 w-8" />
        <span
          className={`text-2xl font-bold text-[#7B4EF3] transition-opacity duration-300 ${
            isSidebarHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          FPrognos
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-1 text-sm text-gray-700">
        <SidebarLink icon={<Compass size={18} />} label="Getting Started" selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <SidebarLink icon={<Rocket size={18} />} label="Let's Get Started" selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <SidebarLink icon={<Pencil size={18} />} label="Create a Strategy" selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <SidebarLink icon={<BarChart2 size={18} />} label="Trading Statistics" selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <SidebarLink icon={<DollarSign size={18} />} label="Subscribe to Paid Plan" selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <SidebarLink icon={<Wrench size={18} />} label="Create Strategy" selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <SidebarLink icon={<FileText size={18} />} label="Download Trade Report" selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <SidebarLink icon={<Bell size={18} />} label="Telegram Notification" selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

        <SidebarCollapsible
          icon={<Settings2 size={18} />}
          label="Broker Setup"
          items={brokerChildren}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          isSidebarHovered={isSidebarHovered}
          forceClose={forceCloseChildren && !brokerChildren.includes(selectedItem)}
        />

        <SidebarCollapsible
          icon={<Settings size={18} />}
          label="Features"
          items={featuresChildren}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          isSidebarHovered={isSidebarHovered}
          forceClose={forceCloseChildren && !featuresChildren.includes(selectedItem)}
        />

        <SidebarLink icon={<HelpCircle size={18} />} label="Help & Support" selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </nav>
    </aside>
  );
}

// SidebarLink Component
function SidebarLink({
  icon,
  label,
  selectedItem,
  setSelectedItem,
}: {
  icon: React.ReactNode;
  label: string;
  selectedItem: string;
  setSelectedItem: (label: string) => void;
}) {
  const isActive = selectedItem === label;

  return (
    <a
      href="#"
      onClick={() => setSelectedItem(label)}
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 font-medium ${
        isActive ? "bg-[#EEE7FB] text-[#7B4EF3]" : "text-gray-600 hover:bg-[#EEE7FB] hover:text-[#7B4EF3]"
      }`}
    >
      <span>{icon}</span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {label}
      </span>
    </a>
  );
}

// SidebarCollapsible Component
function SidebarCollapsible({
  icon,
  label,
  items,
  selectedItem,
  setSelectedItem,
  isSidebarHovered,
  forceClose,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
  selectedItem: string;
  setSelectedItem: (label: string) => void;
  isSidebarHovered: boolean;
  forceClose: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);  // Controls collapse/expand state
  const isChildSelected = items.includes(selectedItem);
  const isParentOrChildSelected = selectedItem === label || isChildSelected;
  const isOpenState = isSidebarHovered && (!forceClose || isChildSelected);

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle collapse/expand state for parent
    setSelectedItem(label);
  };

  return (
    <div>
      <button
        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors duration-200 font-medium ${
          isParentOrChildSelected ? "bg-[#EEE7FB] text-[#7B4EF3]" : "text-gray-600 hover:bg-[#EEE7FB] hover:text-[#7B4EF3]"
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3">
          <span>{icon}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {label}
          </span>
        </div>
      </button>

      {/* Children */}
      <div
        className={`ml-10 space-y-1 transition-all duration-300 ${
          isOpenState ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {items.map((item) => (
          <a
            key={item}
            href="#"
            onClick={() => setSelectedItem(item)}
            className={`block px-2 py-1 rounded-lg transition-colors duration-200 whitespace-nowrap font-medium ${
              selectedItem === item
                ? "bg-[#EEE7FB] text-[#7B4EF3]"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#7B4EF3]"
            } opacity-0 group-hover:opacity-100`}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;


