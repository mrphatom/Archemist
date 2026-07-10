import { createContext, useContext, useState, useEffect, useCallback } from 'react';
type Theme = 'light' | 'dark';
interface ThemeContextValue { theme: Theme; toggle: () => void; isDark: boolean; }
const ThemeContext = createContext<ThemeContextValue>({ theme: 'light', toggle: () => {}, isDark: false });
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('archemist-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  useEffect(() => { const root = document.documentElement; root.classList.remove('light', 'dark'); root.classList.add(theme); localStorage.setItem('archemist-theme', theme); }, [theme]);
  const toggle = useCallback(() => { setTheme((prev) => (prev === 'light' ? 'dark' : 'light')); }, []);
  return <ThemeContext.Provider value={{ theme, toggle, isDark: theme === 'dark' }}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);