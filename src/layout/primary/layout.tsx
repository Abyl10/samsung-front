import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '@/layout';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-row pt-[45px] min-h-screen bg-[#ECDFBB] overflow-hidden relative">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
