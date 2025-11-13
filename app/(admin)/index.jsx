import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminDashboard() {
  const router = useRouter();
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("admin.title") || "Admin Dashboard"}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {t("admin.manageSystem") || "Manage system accounts and users"}
        </Text>
      </View>

      {/* Main content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.welcomeCard, { backgroundColor: colors.surface }]}>
          <View>
            <Text style={[styles.welcomeTitle, { color: colors.text }]}>
              {t("admin.welcome") || "Welcome, Admin!"}
            </Text>
            <Text style={[styles.welcomeSub, { color: colors.textSecondary }]}>
              {t("admin.overseePlatform") ||
                "You can manage all system users below"}
            </Text>
          </View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/552/552721.png",
            }}
            style={styles.adminImage}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("admin.management") || "Management"}
        </Text>

        <View style={styles.row}>
          {/* Manage Accounts */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.surface }]}
            onPress={() => router.push("/(admin)/users")}
          >
            <Ionicons
              name="people-circle-outline"
              size={28}
              color={colors.primary}
            />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {t("admin.accounts") || "Accounts"}
            </Text>
            <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
              {t("admin.manageAccounts") || "Manage all user accounts"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.surface }]}
            onPress={() => router.push("/(admin)/teacher")}
          >
            <Ionicons name="school-outline" size={28} color="#38B2AC" />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {t("admin.teachers") || "Teachers"}
            </Text>
            <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
              {t("admin.manageTeachers") || "View and manage teacher profiles"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 28, fontWeight: "bold", marginBottom: 4 },
  headerSubtitle: { fontSize: 15 },
  content: { flex: 1, padding: 16 },
  welcomeCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  welcomeTitle: { fontSize: 17, fontWeight: "700" },
  welcomeSub: { fontSize: 14, marginTop: 4 },
  adminImage: { width: 60, height: 60, resizeMode: "contain" },
  sectionTitle: { fontSize: 17, fontWeight: "600", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: "600", marginTop: 6 },
  cardSub: { fontSize: 13, textAlign: "center", marginTop: 4 },
});
