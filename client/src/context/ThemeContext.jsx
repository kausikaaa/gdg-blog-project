import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext();

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredTheme = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
};

const setHtmlClass = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getStoredTheme() || getSystemTheme());

  // Apply theme to <html> class and persist preference
  useEffect(() => {
    setHtmlClass(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  // Listen to system changes when user hasn't set an explicit override
  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) return; // Respect explicit user choice
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setTheme(media.matches ? 'dark' : 'light');
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const value = useMemo(() => ({
    theme,
    isDark: theme === 'dark',
    setTheme,
    toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export default ThemeContext;


