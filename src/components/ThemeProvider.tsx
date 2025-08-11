/* eslint-disable react-refresh/only-export-components */
// src/components/ThemeProvider.tsx
'use client'; // <-- บอก Next.js ว่านี่คือ Client Component

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// สร้าง Context สำหรับ Theme
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// สร้าง Provider Component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState('light'); // default theme

  // Effect นี้จะทำงานเฉพาะบน Client เท่านั้น
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// สร้าง Custom Hook เพื่อให้เรียกใช้ง่าย
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}