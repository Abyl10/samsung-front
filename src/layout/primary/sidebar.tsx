import React from 'react';
import { HomeIcon, BookmarkIcon, GearIcon, Icon } from '@primer/octicons-react';
import { NavLink } from 'react-router-dom';
import SidebarIcon from '../../assets/logo.svg';

const sidebar: { name: string; icon: Icon; path: string }[] = [
  {
    name: 'Home',
    icon: HomeIcon,
    path: '/',
  },
  {
    name: 'Bookmark',
    icon: BookmarkIcon,
    path: '/bookmark',
  },
  {
    name: 'Settings',
    icon: GearIcon,
    path: '/settings',
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="absolute top-[200px] h-[300px] w-[100px] border-r-[1px] border-solid border-[#695846] border-opacity-30 flex flex-col justify-between align-center">
      <div className="gap-14 flex flex-col items-center">
        {sidebar.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 w-14 h-14 ${
                  isActive ? 'bg-[#4A4035] rounded-full text-white' : ''
                } hover:text-white hover:bg-[#4A4035] hover:rounded-full`
              }
            >
              <Icon size={24} />
            </NavLink>
          );
        })}
      </div>
      <div className=""></div>
    </aside>
  );
};

export default Sidebar;
