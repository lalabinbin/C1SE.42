import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

import AuthLayout from "./(auth)/_layout";
import AdminLayout from "./(admin)/_layout";
import TabsLayout from "./(tabs)/_layout";
import TeacherLayout from "./(teacher)/_layout";

export default function AppEntry() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) return <AuthLayout />;

  // Phân luồng theo vai trò
  if (user.role === "admin") return <AdminLayout />;
  if (user.role === "teacher") return <TeacherLayout />;
  if (user.role === "user") return <TabsLayout />;

  // Mặc định
  return <AuthLayout />;
}
