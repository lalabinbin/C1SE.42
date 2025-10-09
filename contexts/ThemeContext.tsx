import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    primary: string;
    border: string;
    card: string;
    shadow: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
  primary: "#8B5CF6",
  border: "#E2E8F0",
  card: "#FFFFFF",
  shadow: "#000000",
};

const darkColors = {
  background: "#0F172A",
  surface: "#1E293B",
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  primary: "#A78BFA",
  border: "#334155",
  card: "#1E293B",
  shadow: "#000000",
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("light");

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem("themeMode", mode);
  };

  const isDark = themeMode === "dark";
  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("themeMode");
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeModeState(savedTheme as ThemeMode);
      }
    };
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
