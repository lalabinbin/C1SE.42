import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers) {
          const allUsers = JSON.parse(storedUsers);
          const filteredTeachers = allUsers.filter((u) => u.role === "teacher");
          setTeachers(filteredTeachers);
        }
      } catch (error) {
        console.log("Lỗi khi đọc giáo viên:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Ionicons name="person-outline" size={32} color="#3498db" />
      <View style={styles.info}>
        <Text style={styles.name}>{item.userName || item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.role}>Role: {item.role}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Đang tải danh sách giáo viên...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {teachers.length === 0 ? (
        <View style={styles.empty}>
          <Text>Chưa có giáo viên nào.</Text>
        </View>
      ) : (
        <FlatList
          data={teachers}
          keyExtractor={(item, index) => item.email + index}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  info: { marginLeft: 15 },
  name: { fontSize: 16, fontWeight: "600" },
  email: { fontSize: 14, color: "#7f8c8d" },
  role: { fontSize: 13, color: "#95a5a6", marginTop: 4 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
});
