import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hồ sơ & Cài đặt</Text>
        <Text style={styles.headerSubtitle}>Thông tin cá nhân</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Thông tin người dùng */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Nguyễn Văn An</Text>
            <Text style={styles.email}>an.nguyen@elearnviet.com</Text>
            <Text style={styles.age}>Người lớn</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.editText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>

        {/* Cài đặt chung */}
        <Text style={styles.sectionTitle}>Cài đặt chung</Text>

        <SettingItem
          icon="language-outline"
          title="Ngôn ngữ ứng dụng"
          value="Tiếng Việt"
        />
        <SettingItem icon="moon-outline" title="Chế độ tối" value="Tắt" />
        <SettingItem icon="shield-outline" title="Bảo mật tài khoản" />
        <SettingItem icon="lock-closed-outline" title="Quyền riêng tư" />
        <SettingItem icon="help-circle-outline" title="Trung tâm hỗ trợ" />

        {/* Đăng xuất */}
        <TouchableOpacity style={styles.logout}>
          <Ionicons name="log-out-outline" size={20} color="#d9534f" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const SettingItem = ({ icon, title, value }: any) => (
  <View style={styles.item}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={20} color="#333" />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    {value && <Text style={styles.itemValue}>{value}</Text>}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // giống QuizScreen
  },
  header: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    color: "#666",
  },
  age: {
    color: "#777",
    fontSize: 12,
  },
  editButton: {
    backgroundColor: "#6c63ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  editText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 15,
    marginLeft: 10,
  },
  itemValue: {
    color: "#888",
    fontSize: 14,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  logoutText: {
    color: "#d9534f",
    fontWeight: "600",
    marginLeft: 8,
  },
});
