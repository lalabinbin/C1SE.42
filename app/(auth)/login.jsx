import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "<EXPO_CLIENT_ID>",
    iosClientId: "319437544101-94fc4okbac7a3b5kma3p4ooc4rgdmghi.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      Alert.alert("Đăng nhập thành công", `Xin chào ${user.name}`);
      router.replace("/(tabs)");
    } catch (err) {
      console.log(err);
      Alert.alert("Lỗi", "Không thể lấy thông tin user");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ thông tin");
      return;
    }

    try {
      const user = await login(email, password);
      Alert.alert("Thành công", `Xin chào ${user.name}!`);
      if (user.role === "teacher") router.replace("/(teacher)");
      else if (user.role === "admin") router.replace("/(admin)");
      else router.replace("/(tabs)");
    } catch (err) {
      Alert.alert("Lỗi đăng nhập", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào Mừng Trở Lại!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#7f8c8d" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#7f8c8d" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Google Login */}
      <TouchableOpacity
        style={[styles.btnLogin, { backgroundColor: "#DB4437", flexDirection: "row", justifyContent: "center" }]}
        onPress={() => promptAsync()}
      >
        <Ionicons name="logo-google" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.btnText}>Đăng nhập với Google</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 40 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 10 },
  btnLogin: {
    backgroundColor: "#636ae8",
    padding: 14,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 16,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkText: { color: "#636ae8", textAlign: "center", marginTop: 20 },
});
