import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { colors } = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers) {
          const parsed = JSON.parse(storedUsers);
          setUsers(parsed);
          setFilteredUsers(parsed);
        }
      } catch (error) {
        console.log("Lỗi khi đọc users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = users.filter(
      (u) =>
        (u.userName || u.name)
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        u.email.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteUser = (email) => {
    Alert.alert(
      "Xóa người dùng",
      "Bạn có chắc chắn muốn xóa người dùng này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedUsers = users.filter((u) => u.email !== email);
              await AsyncStorage.setItem(
                "users",
                JSON.stringify(updatedUsers)
              );
              setUsers(updatedUsers);
              setFilteredUsers(
                updatedUsers.filter(
                  (u) =>
                    (u.userName || u.name)
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchText.toLowerCase())
                )
              );
            } catch (error) {
              console.log("Lỗi khi xóa user:", error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.userCard}>
      <Text style={styles.index}>{index + 1}</Text>
      <Ionicons
        name={item.role === "admin" ? "shield-outline" : "person-outline"}
        size={32}
        color={item.role === "admin" ? "#f39c12" : "#3498db"}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.userName || item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>Role: {item.role}</Text>
      </View>
      <Ionicons
        name="trash-outline"
        size={24}
        color="#e74c3c"
        style={{ marginLeft: "auto" }}
        onPress={() => handleDeleteUser(item.email)}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Đang tải danh sách người dùng...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Quản lý người dùng
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Danh sách tất cả tài khoản
        </Text>
      </View>

      <TextInput
        style={[
          styles.searchInput,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Tìm theo tên hoặc email"
        placeholderTextColor={colors.textSecondary}
        value={searchText}
        onChangeText={handleSearch}
      />

      {filteredUsers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Không tìm thấy người dùng.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item, index) => item.email + index}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ flex: 1 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  headerTitle: { fontSize: 28, fontWeight: "bold", marginBottom: 4 },
  headerSubtitle: { fontSize: 16, color: "#7f8c8d" },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  userCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  index: {
    fontSize: 16,
    fontWeight: "bold",
    width: 25,
    textAlign: "center",
    marginRight: 10,
  },
  userInfo: { marginLeft: 15 },
  userName: { fontSize: 16, fontWeight: "600" },
  userEmail: { fontSize: 14, color: "#7f8c8d" },
  userRole: { fontSize: 13, color: "#95a5a6", marginTop: 4 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
