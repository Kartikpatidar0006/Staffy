import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, Menu, X, Moon, Sun, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, desc: 'Overview & stats' },
  { to: '/employees', label: 'Employees', icon: Users, desc: 'Manage team' },
  { to: '/attendance', label: 'Attendance', icon: CalendarCheck, desc: 'Track records' },
];

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const currentPage = navItems.find(
    (item) => item.to === location.pathname || (item.to !== '/' && location.pathname.startsWith(item.to))
  ) || navItems[0];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex transition-colors duration-300">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] flex flex-col bg-white dark:bg-surface-900 border-r border-surface-200/80 dark:border-surface-800 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-surface-100 dark:border-surface-800 shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-emerald-500 shadow-lg shadow-brand-500/25">
            <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="22" r="9" fill="white" opacity="0.95"/>
              <path d="M18 48c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.95"/>
              <circle cx="46" cy="18" r="5" fill="#fbbf24"/>
              <path d="M43.5 18l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-surface-900 dark:text-white">
              Staf<span className="gradient-text">fy</span>
            </span>
            <p className="text-[10px] font-medium text-surface-400 dark:text-surface-500 uppercase tracking-widest -mt-0.5">HR Platform</p>
          </div>
          {/* Mobile close */}
          <button
            className="lg:hidden ml-auto p-1.5 rounded-lg text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-surface-400 dark:text-surface-600">
            Navigation
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 shadow-soft'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800/60 hover:text-surface-900 dark:hover:text-surface-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 group-hover:bg-surface-200 dark:group-hover:bg-surface-700'
                  }`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block truncate">{item.label}</span>
                    <span className={`block text-[11px] truncate -mt-0.5 ${
                      isActive ? 'text-brand-500 dark:text-brand-500' : 'text-surface-400 dark:text-surface-600'
                    }`}>{item.desc}</span>
                  </div>
                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-brand-400 dark:text-brand-500 shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="px-3 py-3 border-t border-surface-100 dark:border-surface-800 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800/60 transition-all duration-200"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
            </div>
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200/60 dark:border-surface-800/60">
          <button
            className="lg:hidden p-2 -ml-1 mr-3 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <currentPage.icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-base font-bold text-surface-900 dark:text-white">{currentPage.label}</h2>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/40">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" />
              <span className="text-xs font-semibold text-brand-700 dark:text-brand-400">Active</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
