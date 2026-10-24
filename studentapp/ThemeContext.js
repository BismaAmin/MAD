import React, { createContext, useContext, useState } from 'react';
import { colors } from './styles';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    isDark,
    background: isDark ? colors.dark : colors.light,
    text: isDark ? '#FFFFFF' : '#666689',
    card: isDark ? '#2A2A3C' : '#FFFFFF',
    toggle: () => setIsDark((prev) => !prev),
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}