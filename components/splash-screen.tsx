import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      // Fade in and scale up logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Slide up text
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto navigate after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, slideAnim, onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo - Purple starburst/asterisk shape */}
        <View style={styles.logo}>
          <View style={styles.logoCenter} />
          <View style={[styles.logoRay, styles.ray1]} />
          <View style={[styles.logoRay, styles.ray2]} />
          <View style={[styles.logoRay, styles.ray3]} />
          <View style={[styles.logoRay, styles.ray4]} />
          <View style={[styles.logoRay, styles.ray5]} />
          <View style={[styles.logoRay, styles.ray6]} />
          <View style={[styles.logoRay, styles.ray7]} />
          <View style={[styles.logoRay, styles.ray8]} />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.textContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.appName}>eLearnViet</Text>
        <Text style={styles.tagline}>
          Học tiếng Việt với niềm vui và văn hóa
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  logoCenter: {
    width: 20,
    height: 20,
    backgroundColor: "#8B5CF6",
    borderRadius: 10,
    position: "absolute",
  },
  logoRay: {
    position: "absolute",
    backgroundColor: "#8B5CF6",
    borderRadius: 2,
  },
  ray1: {
    width: 4,
    height: 20,
    top: 0,
    left: "50%",
    marginLeft: -2,
  },
  ray2: {
    width: 4,
    height: 20,
    bottom: 0,
    left: "50%",
    marginLeft: -2,
  },
  ray3: {
    width: 20,
    height: 4,
    left: 0,
    top: "50%",
    marginTop: -2,
  },
  ray4: {
    width: 20,
    height: 4,
    right: 0,
    top: "50%",
    marginTop: -2,
  },
  ray5: {
    width: 3,
    height: 16,
    top: 8,
    right: 8,
    transform: [{ rotate: "45deg" }],
  },
  ray6: {
    width: 3,
    height: 16,
    bottom: 8,
    left: 8,
    transform: [{ rotate: "45deg" }],
  },
  ray7: {
    width: 3,
    height: 16,
    top: 8,
    left: 8,
    transform: [{ rotate: "-45deg" }],
  },
  ray8: {
    width: 3,
    height: 16,
    bottom: 8,
    right: 8,
    transform: [{ rotate: "-45deg" }],
  },
  textContainer: {
    alignItems: "center",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#8B5CF6",
    marginBottom: 12,
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: width * 0.8,
  },
});
