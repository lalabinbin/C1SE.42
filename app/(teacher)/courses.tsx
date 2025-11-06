import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db, storage } from "../firebase";

export default function courses() {
  const courses = [1, 2, 3];

  const pickAndUploadFile = async (courseId: number) => {
    try {
      console.log("👉 Bắt đầu chọn file cho khóa học:", courseId);

      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
      });

      console.log("📂 Kết quả:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const response = await fetch(file.uri);
        const blob = await response.blob();

        const fileName = file.name || `file_${Date.now()}`;
        const storageRef = ref(storage, `courses/${courseId}/${fileName}`);
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);

        await addDoc(collection(db, "files"), {
          courseId,
          name: fileName,
          url,
          createdAt: serverTimestamp(),
        });

        Alert.alert("✅ Upload thành công!", fileName);
      } else {
        Alert.alert("⚠️ Không có file nào được chọn!");
      }
    } catch (error) {
      console.error("🔥 Lỗi upload:", error);
      Alert.alert("❌ Lỗi upload", (error as Error).message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        style={styles.content}
      >
        <Text style={styles.title}>📘 Danh sách khóa học</Text>
        {courses.map((courseId) => (
          <View key={courseId} style={styles.courseBox}>
            <Ionicons name="book-outline" size={24} color="#4F46E5" />
            <Text style={styles.courseTitle}>Khóa học {courseId}</Text>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickAndUploadFile(courseId)}
            >
              <Text style={styles.uploadText}>Upload file</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  courseBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseTitle: { fontSize: 16, fontWeight: "600", flex: 1, marginLeft: 12 },
  uploadButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  uploadText: { color: "#fff", fontWeight: "600" },
});
