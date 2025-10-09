import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider as CustomThemeProvider } from "@/contexts/ThemeContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <LanguageProvider>
      <CustomThemeProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            {/* Splash Screen */}
            <Stack.Screen name="index" options={{ headerShown: false }} />

            {/* Auth Screens */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />

            {/* Tabs Screens */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Modal */}
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </CustomThemeProvider>
    </LanguageProvider>
  );
}
