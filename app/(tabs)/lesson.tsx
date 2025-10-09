import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LessonScreen() {
  const lessons = [
    {
      id: 1,
      title: "Bảng chữ cái tiếng Việt",
      description: "Học 29 chữ cái và cách phát âm",
      level: "Cơ bản",
      progress: 80,
      icon: "alphabet-outline",
    },
    {
      id: 2,
      title: "Số đếm từ 1-100",
      description: "Học cách đếm và viết số",
      level: "Cơ bản",
      progress: 60,
      icon: "calculator-outline",
    },
    {
      id: 3,
      title: "Gia đình và bạn bè",
      description: "Từ vựng về các mối quan hệ",
      level: "Trung cấp",
      progress: 40,
      icon: "people-outline",
    },
    {
      id: 4,
      title: "Màu sắc và hình dạng",
      description: "Học tên các màu sắc và hình học",
      level: "Cơ bản",
      progress: 90,
      icon: "color-palette-outline",
    },
    {
      id: 5,
      title: "Thời gian và ngày tháng",
      description: "Cách nói về thời gian",
      level: "Trung cấp",
      progress: 30,
      icon: "time-outline",
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "#10B981";
    if (progress >= 60) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bài học</Text>
        <Text style={styles.headerSubtitle}>Chọn bài học để bắt đầu</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {lessons.map((lesson) => (
          <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
            <View style={styles.lessonHeader}>
              <View style={styles.lessonIcon}>
                <Ionicons name={lesson.icon as any} size={24} color="#8B5CF6" />
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDescription}>
                  {lesson.description}
                </Text>
                <View style={styles.lessonMeta}>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>{lesson.level}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${lesson.progress}%`,
                      backgroundColor: getProgressColor(lesson.progress),
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{lesson.progress}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
  content: {
    flex: 1,
    padding: 16,
  },
  lessonCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelBadge: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6366F1",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    minWidth: 35,
  },
});
