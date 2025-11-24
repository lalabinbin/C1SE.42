import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

export default function AdminLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <InnerTabs />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function InnerTabs() {
  const { colors } = useTheme();
  const { t } = useLanguage();

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
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: 4 },
        tabBarIconStyle: { marginBottom: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("admin.dashboard"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: t("admin.users"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="teacher"
        options={{
          title: t("admin.teachers"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="school-outline" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("admin.profile"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}
