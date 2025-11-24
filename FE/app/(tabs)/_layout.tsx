import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  const { t } = useLanguage();
  const { colors, themeMode } = useTheme();

  const isDark = themeMode === "dark";

  const tabBarStyle = {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 80,
    paddingBottom: 15,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
          color: colors.text,
        },
        tabBarIconStyle: { marginBottom: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home.title"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={22} />
          ),
        }}
      />

      <Tabs.Screen
        name="lesson"
        options={{
          title: t("lessons.title"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" color={color} size={22} />
          ),
        }}
      />

      <Tabs.Screen
        name="speak"
        options={{
          title: t("home.pronunciation"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="mic-outline" color={color} size={22} />
          ),
        }}
      />

      <Tabs.Screen
        name="quiz"
        options={{
          title: t("quizzes.title"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" color={color} size={22} />
          ),
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: t("home.exploreMore"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" color={color} size={22} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: t("profile.title"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: t("about.title"),
          href: null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="information-circle-outline" color={color} size={22} />
          ),
        }}
      />
    </Tabs>
    
  );
}
