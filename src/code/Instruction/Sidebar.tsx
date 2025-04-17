import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Sidebar = (props: any) => {
  const [isOpen, setIsOpen] = useState(true);  // State for toggling sidebar on mobile

  const toggleSidebar = () => setIsOpen(!isOpen);  // Toggle the sidebar visibility

  return (
    <div className="relative flex flex-col md:flex-row">
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-100 w-full">
        <button className="text-2xl text-gray-600" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed md:relative top-0 left-0 md:w-[320px] w-full bg-gray-100 md:p-4 border-r border-gray-200 transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`  /* Collapsible for mobile */ }
      >
        <ul className="space-y-2">
        <div className="block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer bg-blue-600 text-white">Getting Started</div>
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "GettingStarted" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("GettingStarted"); toggleSidebar(); }}
            >
              Let's Get Started
            </a>
          </li>
          
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "strategy" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("strategy"); toggleSidebar(); }}
            >
              Create a Strategy
            </a>
          </li>
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "dashboard" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("dashboard"); toggleSidebar(); }}
            >
              Trading Statistics
            </a>
          </li>
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "plan" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("plan"); toggleSidebar(); }}
            >
              Subscribe to Paid Plan
            </a>
          </li>
          <div className="block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer bg-blue-600 text-white">Create Strategy</div>
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "report" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("report"); toggleSidebar(); }}
            >
              Download Trade Report
            </a>
          </li>
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "notification" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("notification"); toggleSidebar(); }}
            >
              Telegram Notification
            </a>
          </li>
          <div className="block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer bg-blue-600 text-white">Broker Setup</div>
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "zerodha" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("zerodha"); toggleSidebar(); }}
            >
              Zerodha
            </a>
          </li>
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "iifl" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("iifl"); toggleSidebar(); }}
            >
              IIFL
            </a>
          </li>
          <div className="block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer bg-blue-600 text-white">Features</div>
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "features" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("features"); toggleSidebar(); }}
            >
              List of All Features
            </a>
          </li>
          <div className="block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer bg-blue-600 text-white">Help & Support</div>
          <li>
            <a 
              className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${props.choice == "help" ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200 hover:text-blue-500"}`}
              onClick={() => { props.setChoice("help"); toggleSidebar(); }}
            >
              Help and Support
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
