// LessonScreen.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase";

export default function LessonScreen({ navigation }: any) {
  const { t, language, setLanguage } = useLanguage();
  const { colors, themeMode, setThemeMode } = useTheme();

  const [files, setFiles] = useState<any[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [courseId, setCourseId] = useState<number>(1);
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, "files"),
      where("courseId", "==", courseId),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list: any[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setFiles(list);
    });
    return () => unsub();
  }, [courseId]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "progress"),
      where("userId", "==", user.uid)
    );
    const unsub = onSnapshot(q, (snap) => {
      const doneIds = snap.docs.map((d) => d.data().fileId);
      setCompletedIds(doneIds);
    });
    return () => unsub();
  }, [user]);

  const markCompleted = async (fileId: string, url: string) => {
    await Linking.openURL(url);
    if (user) {
      await setDoc(
        doc(db, "progress", `${user.uid}_${fileId}`),
        {
          userId: user.uid,
          fileId,
          isCompleted: true,
          completedAt: new Date(),
        },
        { merge: true }
      );
    }
  };
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
  const allCompleted =
    files.length > 0 && files.every((f) => completedIds.includes(f.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("lessons.title")}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {t("lessons.info")}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>📘 Bài học khóa {courseId}</Text>
        {files.length === 0 ? (
          <Text>Chưa có bài học nào.</Text>
        ) : (
          files.map((file) => {
            const done = completedIds.includes(file.id);
            return (
              <TouchableOpacity
                key={file.id}
                style={[styles.fileBox, done && { backgroundColor: "#DCFCE7" }]}
                onPress={() => markCompleted(file.id, file.url)}
              >
                <Text style={styles.fileName}>
                  {done ? "✅ " : "📄 "} {file.name}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.quizButton,
          !allCompleted && { backgroundColor: "#9CA3AF" },
        ]}
        disabled={!allCompleted}
        onPress={() => navigation.navigate("QuizScreen", { courseId })}
      >
        <Text style={styles.quizText}>
          {allCompleted ? "Làm bài Quiz" : "Học hết bài để mở Quiz"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  container: { flex: 1, padding: 16, backgroundColor: "#F8FAFC" },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  fileBox: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  fileName: { fontSize: 16 },
  quizButton: {
    marginTop: 10,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#10B981",
    alignItems: "center",
  },
  quizText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
