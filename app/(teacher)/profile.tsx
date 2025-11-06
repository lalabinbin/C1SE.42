import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { t, language, setLanguage } = useLanguage();
  const { colors, themeMode, setThemeMode } = useTheme();
  const router = useRouter();

  const [editVisible, setEditVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Thông tin giáo viên
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Đổi mật khẩu
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- Lấy dữ liệu người dùng ---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("currentUser");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setName(parsed.userName || parsed.name || "");
          setEmail(parsed.email || "");
        }
      } catch (error) {
        console.log("Lỗi khi đọc user:", error);
      }
    };
    fetchUser();
  }, []);

  // --- Ngôn ngữ ---
  const showLanguageOptions = () => {
    Alert.alert(t("home.selectLanguage"), "", [
      { text: "English", onPress: () => setLanguage("en") },
      { text: "Tiếng Việt", onPress: () => setLanguage("vi") },
      { text: "한국어", onPress: () => setLanguage("ko") },
      { text: "日本語", onPress: () => setLanguage("ja") },
      { text: "中文", onPress: () => setLanguage("zh") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // --- Chế độ sáng/tối ---
  const showThemeOptions = () => {
    Alert.alert(t("home.selectTheme"), "", [
      { text: t("home.light"), onPress: () => setThemeMode("light") },
      { text: t("home.dark"), onPress: () => setThemeMode("dark") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // --- Trung tâm hỗ trợ ---
  const openSupportLink = () => {
    Linking.openURL("https://support.elearnviet.com").catch(() =>
      Alert.alert("Lỗi", "Không thể mở liên kết.")
    );
  };

  // --- Đổi mật khẩu ---
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
      const updated = users.map((u: any) =>
        u.email === user.email && u.password === oldPassword
          ? { ...u, password: newPassword }
          : u
      );

      const found = users.some(
        (u: any) => u.email === user.email && u.password === oldPassword
      );

      if (!found) {
        Alert.alert("Lỗi", "Mật khẩu cũ không đúng.");
        return;
      }

      await AsyncStorage.setItem("users", JSON.stringify(updated));
      Alert.alert("Thành công", "Mật khẩu đã được thay đổi!");
      setPasswordVisible(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đổi mật khẩu, thử lại sau.");
    }
  };

  // --- Lưu hồ sơ ---
  const handleSaveProfile = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
      const updated = users.map((u: any) =>
        u.email === user.email ? { ...u, userName: name, email } : u
      );
      await AsyncStorage.setItem("users", JSON.stringify(updated));
      await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify({ userName: name, email, role: "teacher" })
      );
      Alert.alert("Thành công", "Hồ sơ đã được cập nhật!");
      setEditVisible(false);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật hồ sơ.");
    }
  };

  // --- Đăng xuất ---
  const handleLogout = async () => {
    Alert.alert(t("profile.logout"), t("profile.logoutMessage"), [
      { text: t("profile.cancel"), style: "cancel" },
      {
        text: t("profile.logout"),
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("currentUser");
          Alert.alert("Đăng xuất thành công", "Bạn đã đăng xuất khỏi hệ thống.");
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Hồ sơ giáo viên
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Quản lý thông tin tài khoản của bạn
        </Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=12" }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
            <Text style={[styles.email, { color: colors.textSecondary }]}>
              {email}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: colors.primary }]}
          onPress={() => setEditVisible(true)}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.editText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Cài đặt</Text>

        <SettingItem
          icon="language-outline"
          title="Ngôn ngữ"
          value={
            language === "vi"
              ? "Tiếng Việt"
              : language === "en"
              ? "English"
              : language === "ko"
              ? "한국어"
              : language === "ja"
              ? "日本語"
              : "中文"
          }
          onPress={showLanguageOptions}
          colors={colors}
        />
        <SettingItem
          icon="moon-outline"
          title="Chế độ tối"
          value={themeMode === "dark" ? "Bật" : "Tắt"}
          onPress={showThemeOptions}
          colors={colors}
        />
        <SettingItem
          icon="shield-outline"
          title="Đổi mật khẩu"
          onPress={() => setPasswordVisible(true)}
          colors={colors}
        />
        <SettingItem
          icon="help-circle-outline"
          title="Trung tâm hỗ trợ"
          onPress={openSupportLink}
          colors={colors}
        />

        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#d9534f" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal đổi mật khẩu */}
      <Modal visible={passwordVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Đổi mật khẩu
            </Text>
            {[oldPassword, newPassword, confirmPassword].map((val, i) => (
              <TextInput
                key={i}
                value={val}
                onChangeText={
                  i === 0
                    ? setOldPassword
                    : i === 1
                    ? setNewPassword
                    : setConfirmPassword
                }
                placeholder={
                  i === 0
                    ? "Mật khẩu cũ"
                    : i === 1
                    ? "Mật khẩu mới"
                    : "Xác nhận mật khẩu"
                }
                secureTextEntry
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.surface,
                  },
                ]}
                placeholderTextColor={colors.textSecondary}
              />
            ))}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.border }]}
                onPress={() => setPasswordVisible(false)}
              >
                <Text style={{ color: colors.text }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.primary }]}
                onPress={handleChangePassword}
              >
                <Text style={{ color: "#fff" }}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal chỉnh sửa hồ sơ */}
      <Modal visible={editVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Chỉnh sửa hồ sơ
            </Text>
            {[{ value: name, setter: setName, placeholder: "Tên giáo viên" },
              { value: email, setter: setEmail, placeholder: "Email" }].map(
              (f, i) => (
                <TextInput
                  key={i}
                  value={f.value}
                  onChangeText={f.setter}
                  placeholder={f.placeholder}
                  style={[
                    styles.input,
                    {
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: colors.surface,
                    },
                  ]}
                  placeholderTextColor={colors.textSecondary}
                />
              )
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.border }]}
                onPress={() => setEditVisible(false)}
              >
                <Text style={{ color: colors.text }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.primary }]}
                onPress={handleSaveProfile}
              >
                <Text style={{ color: "#fff" }}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// --- Setting Item ---
const SettingItem = ({ icon, title, value, onPress, colors }: any) => (
  <TouchableOpacity
    style={[
      styles.item,
      { borderBottomColor: colors.border, backgroundColor: colors.surface },
    ]}
    onPress={onPress}
  >
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={20} color={colors.text} />
      <Text style={[styles.itemText, { color: colors.text }]}>{title}</Text>
    </View>
    {value && (
      <Text style={[styles.itemValue, { color: colors.textSecondary }]}>
        {value}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: { fontSize: 16 },
  container: { flex: 1, paddingHorizontal: 20 },
  profileCard: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  name: { fontSize: 16, fontWeight: "600" },
  email: { fontSize: 14 },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  editText: { color: "#fff", marginLeft: 6, fontWeight: "600" },
  sectionTitle: { fontSize: 15, fontWeight: "600", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  itemText: { fontSize: 15, marginLeft: 10 },
  itemValue: { fontSize: 14 },
  logout: { flexDirection: "row", alignItems: "center", marginTop: 25 },
  logoutText: { color: "#d9534f", fontWeight: "600", marginLeft: 8 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalContent: { borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});
