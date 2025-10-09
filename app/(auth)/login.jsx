import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // Cấu hình Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "794065954555-itrtaeeb00db48kd7r775560r8ossr8e.apps.googleusercontent.com",
    webClientId:
      "794065954555-itrtaeeb00db48kd7r775560r8ossr8e.apps.googleusercontent.com",
    androidClientId:
      "794065954555-itrtaeeb00db48kd7r775560r8ossr8e.apps.googleusercontent.com",
  });

  // Xử lý khi Google trả kết quả
  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      Alert.alert("Thành công", "Đăng nhập với Google thành công!");
      router.replace("/(tabs)");
    }
  }, [response]);
  const handleLogin = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("users"));
      console.log(userData);

      if (!userData) {
        Alert.alert("Lỗi", "Chưa có tài khoản nào, hãy đăng ký trước");
        return;
      }

      const user = userData.find(
        (item) => item.email === email && item.password === password
      );

      if (user) {
        Alert.alert("Thành công", "Đăng nhập thành công!");
        await AsyncStorage.setItem("currentUser", JSON.stringify([user]));
        router.replace("/(tabs)");
      } else {
        Alert.alert("Sai thông tin", "Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đăng nhập, thử lại sau");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào Mừng Trở Lại!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.linkText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>HOẶC</Text>
        <View style={styles.line} />
      </View>

      {/* Nút đăng nhập với Google */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.googleText}>Đăng nhập với Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.googleText}>Đăng nhập với Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký Ngay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 48,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 16,
    borderRadius: 15,
  },
  btnLogin: {
    backgroundColor: "#636ae8",
    padding: 14,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 16,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    color: "#636ae8",
    textAlign: "center",
    marginVertical: 10,
    marginTop: 33,
    fontSize: 14,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    flex: 1,
  },
  orText: {
    textAlign: "center",
    margin: 20,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  googleButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  googleText: {
    color: "black",
    fontWeight: "bold",
  },
});
