import SplashScreen from "@/components/splash-screen";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Navigate to login screen first
    router.replace("/(auth)/login");
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return <View />;
}
