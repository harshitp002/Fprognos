import { useState } from 'react';
import Navbar from '../Layout/Navbar';
import Sidebar from './Sidebar';
import GettingStarted from './Component/GettingStarted';
import PaidPlan from './Component/PaidPlan';
import Features from './Component/Features';
import StrategyCreate from './Component/StrategyCreate';
import Dashboard from './Component/Dashboard';
import Report from './Component/Report';
import HelpSupport from './Component/HelpSupport';
import Notification from './Component/Notification';
import Zerodha from './Component/Zerodha';
import Iifl from './Component/Iifl';
import Notes from './Component/Notes';

const Instruction = () => {
  const [choice, setChoice] = useState("GettingStarted");

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main layout */}
      <div className="flex flex-col md:flex-row h-screen">
        
        {/* Sidebar */}
        <Sidebar choice={choice} setChoice={setChoice} />

        {/* Content Area */}
        <div className="flex-grow p-4 overflow-y-auto">
          {choice === "GettingStarted" && <GettingStarted />}
          {choice === "plan" && <PaidPlan />}
          {choice === "strategy" && <StrategyCreate />}
          {choice === "dashboard" && <Dashboard />}
          {choice === "features" && <Notes />}
          {choice === "zerodha" && <Zerodha/>}
          {choice === "iifl" && <Iifl/>}
          {choice === "report" && <Report />}
          {choice === "help" && <HelpSupport />}
          {choice === "notification" && <Notification />}
        </div>
      </div>
    </>
  );
};

export default Instruction;
