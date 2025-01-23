import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 antialiased">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div
        className={`
        flex-1 
        bg-gradient-to-br from-[#F8F5F0] to-[#c47238]
        flex flex-col 
        transition-all 
        duration-300 
        ${isSidebarOpen ? "ml-56" : "ml-16"}
      `}
      >
        <Navbar />
        <main className="flex-grow p-6 space-y-6 overflow-y-auto">
          {children}
        </main>
        {/* <footer className="bg-white/70 backdrop-blur-sm p-4 text-center text-[#6F4E37] text-sm">
          © 2024 Your Company. All rights reserved.
        </footer> */}
      </div>
    </div>
  );
};

export default Layout;
