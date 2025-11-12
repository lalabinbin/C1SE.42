import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IntroImage from "../assets/Selection.jpg";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function IntroScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={IntroImage} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>Bài học MOET chuẩn quốc tế</Text>
        <Text style={styles.description}>
          Chương trình học Tiếng Việt theo chuẩn Bộ Giáo dục và Đào tạo, được thiết kế riêng cho trẻ em Việt kiều, đảm bảo nền tảng vững chắc.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace("/(auth)/login")}>
          <Text style={styles.buttonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  content: { flex: 1, justifyContent: "flex-start" },
  image: { width: width - 40, height: 300, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 31, fontWeight: "bold", textAlign: "center", marginBottom: 12 },
  description: { fontSize: 16, textAlign: "center", color: "#6B7280", marginBottom: 20 },
  button: { backgroundColor: "#8B5CF6", padding: 14, borderRadius: 12, width: "100%", alignItems: "center", marginTop: "auto" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
