import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-lg supports-[backdrop-filter]:bg-white/50 border-b border-white/40 ring-1 ring-black/5 shadow-sm dark:bg-gray-900/50 dark:supports-[backdrop-filter]:bg-gray-900/40 dark:border-white/10 dark:ring-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left: Logo/Title */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">B</span>
              <span className="text-lg font-semibold">Blog</span>
            </Link>
          </div>
          {/* Center: Primary Links */}
          <div className="hidden sm:flex items-center justify-center gap-2 sm:gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-accent bg-accent/10 dark:text-accent/90 dark:bg-accent/10' : 'text-gray-800 hover:text-gray-900 hover:bg-white/50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/5'}`
              }
              end
            >
              Home
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-accent bg-accent/10 dark:text-accent/90 dark:bg-accent/10' : 'text-gray-800 hover:text-gray-900 hover:bg-white/50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/5'}`
                }
              >
                Create Post
              </NavLink>
            )}
          </div>

          {/* Right: Theme toggle + Auth */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="px-2 py-2 rounded-md text-accent hover:bg-white/50 dark:text-accent/90 dark:hover:bg-white/5"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                // Sun icon
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                // Moon icon
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 118.646 3.646 7 7 0 0020.354 15.354z" />
                </svg>
              )}
            </button>
            <button
              className="sm:hidden px-2 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                // Close icon
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            {isAuthenticated ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-700 mr-2 dark:text-gray-300">Hi, {user?.name}</span>
                <button onClick={logout} className="inline-flex items-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition-colors duration-200 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white">Logout</button>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">Login</Link>
                <Link to="/register" className="inline-flex items-center px-4 py-2 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors duration-200">Sign up</Link>
              </div>
            )}
          </div>
        </div>
        {mobileOpen && (
          <div className="sm:hidden pb-4">
            <div className="mt-2 space-y-1">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-accent bg-accent/10 dark:text-accent/90 dark:bg-accent/10' : 'text-gray-800 hover:text-gray-900 hover:bg-white/50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/5'}`
                }
                end
              >
                Home
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  to="/create"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-accent bg-accent/10 dark:text-accent/90 dark:bg-accent/10' : 'text-gray-800 hover:text-gray-900 hover:bg-white/50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/5'}`
                  }
                >
                  Create
                </NavLink>
              )}
              {isAuthenticated ? (
                <button onClick={() => { setMobileOpen(false); logout(); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-900 hover:bg-white/50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/5">Logout</button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-900 hover:bg-white/50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/5">Login</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-accent hover:bg-accent/10">Sign up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;


