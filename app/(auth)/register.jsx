import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleRegister = async () => {
    if (!email || !phone || !name || !password || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      return;
    }

    try {
      // Lấy danh sách user đã có (nếu có)
      const existingData = await AsyncStorage.getItem("users");
      const users = existingData ? JSON.parse(existingData) : [];

      // Kiểm tra trùng email hoặc số điện thoại
      const duplicate = users.find(
        (item) => item.email === email || item.phone === phone
      );
      if (duplicate) {
        Alert.alert("Lỗi", "Email hoặc số điện thoại đã được đăng ký");
        return;
      }

      // Tạo user mới
      const newUser = { email, name, phone, password };
      users.push(newUser);


      // Lưu danh sách và người dùng hiện tại
      await AsyncStorage.setItem("users", JSON.stringify(users));
      
      Alert.alert("Thành công", "Đăng ký thành công!");
      router.replace("/(auth)/login"); // hoặc đường dẫn Home của bạn
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đăng ký, thử lại sau");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo Tài Khoản Mới</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
        <Text style={styles.btnText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập ngay</Text>
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
  btnRegister: {
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
});
