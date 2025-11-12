import React from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.side}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerText}>Giới thiệu eLearnViet</Text>

        {/* View bên phải để cân xứng với icon bên trái */}
        <View style={styles.side} />
      </View>

      {/* NỘI DUNG */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Sứ mệnh của chúng tôi</Text>
          <Image source={require("../../assets/images/about/about1.jpg")} style={styles.image} />
          <Text style={styles.text}>
            eLearnViet được thành lập với sứ mệnh bảo tồn và phát huy ngôn ngữ, văn hóa Việt Nam
            trong cộng đồng người Việt hải ngoại và thế giới yêu đẹp của tiếng Việt đến mọi lứa tuổi.
            Chúng tôi tin rằng việc học tiếng mẹ đẻ không chỉ là kiến thức mà còn là tình cảm, gắn kết
            gia đình và cội nguồn.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Trải nghiệm học tập độc đáo</Text>
          <Image source={require("../../assets/images/about/about2.jpg")} style={styles.image} />
          <Text style={styles.text}>
            Chúng tôi cung cấp chương trình học toàn diện được giảng dạy theo chuẩn Bộ Giáo dục và
            Đào tạo Việt Nam, kết hợp công nghệ AI giúp người học phát triển kỹ năng ngôn ngữ một
            cách tự nhiên. Giao diện thân thiện, tương tác cao, phù hợp cho cả trẻ em và người lớn.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Dễ dàng theo dõi tiến độ</Text>
          <Image source={require("../../assets/images/about/about3.jpg")} style={styles.image} />
          <Text style={styles.text}>
            Với eLearnViet, người học có thể theo dõi hành trình học của mình thông qua các báo cáo,
            huy hiệu thành tích và công cụ nhắc học giúp duy trì kỷ luật và động lực học.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  side: {
    width: 40, // chiều rộng bằng với vùng icon để cân đối
    alignItems: "center",
  },
  backButton: {
    padding: 6,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  text: {
    fontSize: 13,
    color: "#4b5563",
    lineHeight: 20,
  },
});
