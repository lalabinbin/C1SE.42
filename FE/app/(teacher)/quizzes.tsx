import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

export default function QuizzesScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Bài kiểm tra của {user?.name}</Text>

        {[1,2].map(i => (
          <TouchableOpacity key={i} style={[styles.quizBox, { backgroundColor: colors.surface }]}>
            <Ionicons name="pencil-outline" size={24} color={colors.primary} />
            <Text style={[styles.quizTitle, { color: colors.text }]}>Quiz {i}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  content:{flex:1,padding:16},
  title:{fontSize:20,fontWeight:"600",marginBottom:12},
  quizBox:{
    flexDirection:"row",
    alignItems:"center",
    padding:16,
    borderRadius:12,
    marginBottom:12,
    shadowColor:"#000",
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.1,
    shadowRadius:2,
    elevation:2,
    gap:12
  },
  quizTitle:{fontSize:16,fontWeight:"600"}
});
