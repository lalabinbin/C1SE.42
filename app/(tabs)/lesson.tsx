import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { db } from "../firebase";

export default function Lesson() {
  const [files, setFiles] = useState<any[]>([]);
  const [courseId, setCourseId] = useState<number>(1);

  useEffect(() => {
    const q = query(
      collection(db, "files"),
      where("courseId", "==", courseId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fileList: any[] = [];
      snapshot.forEach((doc) => fileList.push({ id: doc.id, ...doc.data() }));
      setFiles(fileList);
    });

    return () => unsubscribe();
  }, [courseId]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📂 Bài học khóa {courseId}</Text>
      <ScrollView style={styles.content}>
        {files.length === 0 ? (
          <Text>Chưa có file nào.</Text>
        ) : (
          files.map((file) => (
            <TouchableOpacity
              key={file.id}
              style={styles.fileBox}
              onPress={() => Linking.openURL(file.url)}
            >
              <Text style={styles.fileName}>{file.name}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F8FAFC" },
  content: { marginTop: 12 },
  title: { fontSize: 20, fontWeight: "bold" },
  fileBox: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  fileName: { fontSize: 16, color: "#1F2937" },
});
