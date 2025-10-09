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

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'Từ "Xin chào" có nghĩa là gì?',
      options: ["Hello", "Thank you", "Goodbye", "Please"],
      correctAnswer: 0,
      explanation:
        '"Xin chào" là cách chào hỏi thông thường trong tiếng Việt, tương đương với "Hello" trong tiếng Anh.',
    },
    {
      id: 2,
      question: 'Số "5" trong tiếng Việt được viết như thế nào?',
      options: ["Năm", "Bốn", "Sáu", "Bảy"],
      correctAnswer: 0,
      explanation: 'Số 5 trong tiếng Việt được viết là "năm".',
    },
    {
      id: 3,
      question: "Màu đỏ trong tiếng Việt là gì?",
      options: ["Xanh", "Vàng", "Đỏ", "Tím"],
      correctAnswer: 2,
      explanation: 'Màu đỏ trong tiếng Việt vẫn là "đỏ".',
    },
    {
      id: 4,
      question: 'Từ "Gia đình" có nghĩa là gì?',
      options: ["Friends", "Family", "School", "Work"],
      correctAnswer: 1,
      explanation:
        '"Gia đình" có nghĩa là "Family" - những người thân trong nhà.',
    },
    {
      id: 5,
      question: 'Cách nói "Tôi tên là..." trong tiếng Việt?',
      options: ["Tôi là...", "Tôi tên là...", "Tên tôi...", "Tôi gọi là..."],
      correctAnswer: 1,
      explanation:
        'Cách đúng để giới thiệu tên là "Tôi tên là..." + tên của bạn.',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      Alert.alert("Vui lòng chọn đáp án!");
      return;
    }

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  const getOptionStyle = (index: number) => {
    if (selectedAnswer === null) {
      return styles.option;
    }

    if (index === questions[currentQuestion].correctAnswer) {
      return [styles.option, styles.correctOption];
    }

    if (
      index === selectedAnswer &&
      index !== questions[currentQuestion].correctAnswer
    ) {
      return [styles.option, styles.wrongOption];
    }

    return styles.option;
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Ionicons
            name={
              percentage >= 80
                ? "trophy"
                : percentage >= 60
                ? "checkmark-circle"
                : "alert-circle"
            }
            size={80}
            color={
              percentage >= 80
                ? "#F59E0B"
                : percentage >= 60
                ? "#10B981"
                : "#EF4444"
            }
          />
          <Text style={styles.resultTitle}>Kết quả Quiz</Text>
          <Text style={styles.resultScore}>
            {score}/{questions.length} ({percentage}%)
          </Text>
          <Text style={styles.resultMessage}>
            {percentage >= 80
              ? "Xuất sắc! Bạn đã nắm vững kiến thức!"
              : percentage >= 60
              ? "Tốt! Hãy tiếp tục luyện tập!"
              : "Cần cố gắng thêm! Hãy ôn lại bài học."}
          </Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestart}
          >
            <Text style={styles.restartButtonText}>Làm lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz</Text>
        <Text style={styles.headerSubtitle}>
          Câu {currentQuestion + 1}/{questions.length}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            {questions[currentQuestion].question}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(index)}
              onPress={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
              {selectedAnswer !== null &&
                index === questions[currentQuestion].correctAnswer && (
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                )}
              {selectedAnswer === index &&
                index !== questions[currentQuestion].correctAnswer && (
                  <Ionicons name="close-circle" size={20} color="#EF4444" />
                )}
            </TouchableOpacity>
          ))}
        </View>

        {selectedAnswer !== null && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Giải thích:</Text>
            <Text style={styles.explanationText}>
              {questions[currentQuestion].explanation}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.nextButton,
            selectedAnswer === null && styles.disabledButton,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion < questions.length - 1
              ? "Tiếp theo"
              : "Xem kết quả"}
          </Text>
        </TouchableOpacity>
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
  },
  questionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  correctOption: {
    backgroundColor: "#D1FAE5",
    borderWidth: 2,
    borderColor: "#10B981",
  },
  wrongOption: {
    backgroundColor: "#FEE2E2",
    borderWidth: 2,
    borderColor: "#EF4444",
  },
  optionText: {
    fontSize: 16,
    color: "#1F2937",
    flex: 1,
  },
  explanationContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#D1D5DB",
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 20,
    marginBottom: 10,
  },
  resultScore: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8B5CF6",
    marginBottom: 20,
  },
  resultMessage: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  restartButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
