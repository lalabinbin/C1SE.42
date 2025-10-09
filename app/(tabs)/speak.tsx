import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SpeakScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentWord, setCurrentWord] = useState("Xin chào");
  const [score, setScore] = useState(0);

  const words = [
    { vietnamese: "Xin chào", english: "Hello", pronunciation: "sin chow" },
    { vietnamese: "Cảm ơn", english: "Thank you", pronunciation: "gam uhn" },
    { vietnamese: "Tạm biệt", english: "Goodbye", pronunciation: "tam bee-et" },
    {
      vietnamese: "Tôi tên là",
      english: "My name is",
      pronunciation: "toy ten la",
    },
    {
      vietnamese: "Bạn khỏe không?",
      english: "How are you?",
      pronunciation: "ban kway khong",
    },
  ];

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording
      setTimeout(() => {
        setIsRecording(false);
        Alert.alert("Hoàn thành!", "Phát âm của bạn đã được ghi lại");
        setScore(score + 10);
      }, 3000);
    }
  };

  const nextWord = () => {
    const currentIndex = words.findIndex((w) => w.vietnamese === currentWord);
    const nextIndex = (currentIndex + 1) % words.length;
    setCurrentWord(words[nextIndex].vietnamese);
  };

  const currentWordData = words.find((w) => w.vietnamese === currentWord);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Phát âm</Text>
        <Text style={styles.headerSubtitle}>Luyện phát âm tiếng Việt</Text>
      </View>

      <View style={styles.content}>
        {/* Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Điểm: {score}</Text>
        </View>

        {/* Word Card */}
        <View style={styles.wordCard}>
          <Text style={styles.vietnameseWord}>
            {currentWordData?.vietnamese}
          </Text>
          <Text style={styles.englishTranslation}>
            {currentWordData?.english}
          </Text>
          <Text style={styles.pronunciation}>
            /{currentWordData?.pronunciation}/
          </Text>
        </View>

        {/* Recording Button */}
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordingButton]}
          onPress={handleRecord}
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={32}
            color="#ffffff"
          />
          <Text style={styles.recordButtonText}>
            {isRecording ? "Đang ghi âm..." : "Nhấn để ghi âm"}
          </Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={nextWord}>
          <Text style={styles.nextButtonText}>Từ tiếp theo</Text>
          <Ionicons name="arrow-forward" size={20} color="#8B5CF6" />
        </TouchableOpacity>

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Mẹo phát âm:</Text>
          <Text style={styles.tipsText}>
            • Nói rõ ràng và chậm rãi{"\n"}• Chú ý đến dấu thanh điệu{"\n"}•
            Lắng nghe và lặp lại nhiều lần
          </Text>
        </View>
      </View>
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
    padding: 20,
    alignItems: "center",
  },
  scoreContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  scoreText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  wordCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: "100%",
  },
  vietnameseWord: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  englishTranslation: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 8,
    textAlign: "center",
  },
  pronunciation: {
    fontSize: 16,
    color: "#8B5CF6",
    fontStyle: "italic",
    textAlign: "center",
  },
  recordButton: {
    backgroundColor: "#8B5CF6",
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordingButton: {
    backgroundColor: "#EF4444",
    shadowColor: "#EF4444",
  },
  recordButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: "#8B5CF6",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  tipsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
});
