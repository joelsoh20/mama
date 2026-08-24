import { useEffect, useState } from 'react';

const getInitialTheme = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return savedTheme || (prefersDark ? 'dark' : 'light');
};

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, toggleTheme };
};