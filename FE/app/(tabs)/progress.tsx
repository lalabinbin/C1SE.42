import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProgressScreen() {
  const stats = {
    totalLessons: 25,
    completedLessons: 18,
    totalWords: 500,
    learnedWords: 320,
    streak: 7,
    totalTime: 45,
  };

  const achievements = [
    {
      id: 1,
      title: "Người mới bắt đầu",
      description: "Hoàn thành bài học đầu tiên",
      icon: "star",
      color: "#F59E0B",
      unlocked: true,
    },
    {
      id: 2,
      title: "Học viên chăm chỉ",
      description: "Học liên tiếp 7 ngày",
      icon: "flame",
      color: "#EF4444",
      unlocked: true,
    },
    {
      id: 3,
      title: "Bậc thầy từ vựng",
      description: "Học 300 từ mới",
      icon: "book",
      color: "#8B5CF6",
      unlocked: true,
    },
    {
      id: 4,
      title: "Thiên tài phát âm",
      description: "Đạt điểm cao trong 10 bài phát âm",
      icon: "mic",
      color: "#10B981",
      unlocked: false,
    },
    {
      id: 5,
      title: "Nhà vô địch Quiz",
      description: "Đạt 100% trong 5 quiz liên tiếp",
      icon: "trophy",
      color: "#F59E0B",
      unlocked: false,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Hoàn thành bài học "Màu sắc"',
      time: "2 giờ trước",
      type: "lesson",
    },
    {
      id: 2,
      action: 'Đạt 90% trong Quiz "Số đếm"',
      time: "1 ngày trước",
      type: "quiz",
    },
    {
      id: 3,
      action: 'Luyện phát âm "Xin chào"',
      time: "1 ngày trước",
      type: "speak",
    },
    {
      id: 4,
      action: "Học 15 từ mới",
      time: "2 ngày trước",
      type: "vocabulary",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return "book-outline";
      case "quiz":
        return "help-circle-outline";
      case "speak":
        return "mic-outline";
      case "vocabulary":
        return "library-outline";
      default:
        return "checkmark-circle-outline";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "lesson":
        return "#8B5CF6";
      case "quiz":
        return "#F59E0B";
      case "speak":
        return "#10B981";
      case "vocabulary":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tiến độ</Text>
        <Text style={styles.headerSubtitle}>Theo dõi quá trình học tập</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="book-outline" size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>
              {stats.completedLessons}/{stats.totalLessons}
            </Text>
            <Text style={styles.statLabel}>Bài học</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="library-outline" size={24} color="#10B981" />
            <Text style={styles.statNumber}>{stats.learnedWords}</Text>
            <Text style={styles.statLabel}>Từ vựng</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="flame-outline" size={24} color="#EF4444" />
            <Text style={styles.statNumber}>{stats.streak}</Text>
            <Text style={styles.statLabel}>Ngày liên tiếp</Text>
          </View>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>Tổng quan tiến độ</Text>

          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Bài học</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      (stats.completedLessons / stats.totalLessons) * 100
                    }%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((stats.completedLessons / stats.totalLessons) * 100)}%
            </Text>
          </View>

          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Từ vựng</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(stats.learnedWords / stats.totalWords) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((stats.learnedWords / stats.totalWords) * 100)}%
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsCard}>
          <Text style={styles.cardTitle}>Thành tựu</Text>
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementItem,
                !achievement.unlocked && styles.lockedAchievement,
              ]}
            >
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.color },
                ]}
              >
                <Ionicons
                  name={achievement.icon as any}
                  size={20}
                  color="#ffffff"
                />
              </View>
              <View style={styles.achievementInfo}>
                <Text
                  style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.lockedText,
                  ]}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={[
                    styles.achievementDescription,
                    !achievement.unlocked && styles.lockedText,
                  ]}
                >
                  {achievement.description}
                </Text>
              </View>
              {achievement.unlocked && (
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              )}
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.cardTitle}>Hoạt động gần đây</Text>
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View
                style={[
                  styles.activityIcon,
                  { backgroundColor: getActivityColor(activity.type) },
                ]}
              >
                <Ionicons
                  name={getActivityIcon(activity.type) as any}
                  size={16}
                  color="#ffffff"
                />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  progressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  progressItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: "#6B7280",
    width: 80,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginHorizontal: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8B5CF6",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    width: 40,
    textAlign: "right",
  },
  achievementsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  lockedText: {
    color: "#9CA3AF",
  },
  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#6B7280",
  },
});
