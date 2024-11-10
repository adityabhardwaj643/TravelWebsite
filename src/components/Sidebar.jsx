import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import homeIcon from '../assets/homeIcon.png';
import itineraryIcon from '../assets/itineraryIcon.png';
import discoverIcon from '../assets/discoverIcon.png';
import profileIcon from '../assets/profileIcon.png';
import messageIcon from '../assets/messageIcon.png';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: homeIcon,
      label: 'Home',
      path: '/',
      iconClassName: "w-8 h-8"
    },
    {
      icon: itineraryIcon,
      label: 'Itinerary',
      path: '/itinerary',
      iconClassName: "w-8 h-8"
    },
    {
      icon: discoverIcon,
      label: 'Discover',
      path: '/discover',
      iconClassName: "w-8 h-8"
    },
    {
      icon: profileIcon,
      label: 'Profile',
      path: '/profile',
      iconClassName: "w-8 h-8"
    },
    {
      icon: messageIcon,
      label: 'Messages',
      path: '/messages',
      iconClassName: "w-8 h-8"
    }
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-24 bg-[#3C4434] z-50">
      <div className="flex flex-col justify-center h-full py-8">
        <div className="flex flex-col space-y-16">
          {navItems.map(({ icon, label, path, iconClassName }) => {
            const isActive = location.pathname === path ||
                           (path === '/' && location.pathname === '/home');
            
            return (
              <Link
                key={path}
                to={path}
                className={`w-full flex flex-col items-center cursor-pointer
                          ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}
              >
                <div className="flex flex-col items-center group">
                  <img
                    src={icon}
                    alt={label}
                    className={`${iconClassName} ${
                      isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                    } transition-all duration-200`}
                  />
                  <span className={`text-sm font-light mt-1 ${
                    isActive ? 'text-white' : 'text-white/90 group-hover:text-white'
                  }`}>
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;