import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Bell, Search, ChevronDown, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface TopbarProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/projects': 'Projects',
  '/app/tasks': 'Tasks',
  '/app/team': 'Team',
  '/app/settings': 'Settings',
};

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pageTitle = pageTitles[location.pathname] ?? 'SprintDesk';
  const initials = user?.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'U';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
      {/* Left: menu + title */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="btn-icon lg:hidden">
          <Menu size={20} />
        </button>
        <h2 className="font-display font-semibold text-gray-900 text-lg hidden sm:block">{pageTitle}</h2>
      </div>

      {/* Center: search */}
      <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-64 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-400/20 transition-all">
        <Search size={15} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search tasks, projects…"
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1 font-sans"
        />
      </div>

      {/* Right: notifications + avatar */}
      <div className="flex items-center gap-2">
        <button className="btn-icon relative">
          <Bell size={18} />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(v => !v)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
              {initials}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name?.split(' ')[0]}</span>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 card shadow-lg z-50 py-1 animate-slide-up">
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => { navigate('/app/settings'); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Settings size={15} className="text-gray-400" /> Settings
                  </button>
                )}
                <button
                  onClick={() => { navigate('/app/settings'); setDropdownOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                >
                  <UserIcon size={15} className="text-gray-400" /> Profile
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
