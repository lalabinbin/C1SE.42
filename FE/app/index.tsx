import React, { useRef, useEffect } from "react";
import { Animated, StatusBar, StyleSheet, Text, View, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      ]),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start(() => {
      router.replace("/intro"); 
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logo}>
          <View style={styles.logoCenter} />
          {[...Array(8)].map((_, i) => (
            <View key={i} style={[styles.logoRay, styles[`ray${i + 1}` as keyof typeof styles]]} />
          ))}
        </View>
      </Animated.View>
      <Animated.View style={[styles.textContainer, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.appName}>eLearnViet</Text>
        <Text style={styles.tagline}>Học tiếng Việt với niềm vui và văn hóa</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  logoContainer: { marginBottom: 40 },
  logo: { width: 80, height: 80, justifyContent: "center", alignItems: "center", position: "relative" },
  logoCenter: { width: 20, height: 20, backgroundColor: "#8B5CF6", borderRadius: 10, position: "absolute" },
  logoRay: { position: "absolute", backgroundColor: "#8B5CF6", borderRadius: 2 },
  ray1: { width: 4, height: 20, top: 0, left: "50%", marginLeft: -2 },
  ray2: { width: 4, height: 20, bottom: 0, left: "50%", marginLeft: -2 },
  ray3: { width: 20, height: 4, left: 0, top: "50%", marginTop: -2 },
  ray4: { width: 20, height: 4, right: 0, top: "50%", marginTop: -2 },
  ray5: { width: 3, height: 16, top: 8, right: 8, transform: [{ rotate: "45deg" }] },
  ray6: { width: 3, height: 16, bottom: 8, left: 8, transform: [{ rotate: "45deg" }] },
  ray7: { width: 3, height: 16, top: 8, left: 8, transform: [{ rotate: "-45deg" }] },
  ray8: { width: 3, height: 16, bottom: 8, right: 8, transform: [{ rotate: "-45deg" }] },
  textContainer: { alignItems: "center" },
  appName: { fontSize: 32, fontWeight: "bold", fontStyle: "italic", color: "#8B5CF6", marginBottom: 12, textAlign: "center" },
  tagline: { fontSize: 16, color: "#6B7280", textAlign: "center", lineHeight: 22, maxWidth: width * 0.8 },
});
