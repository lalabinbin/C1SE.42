import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentsScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const students = ["Alice", "Bob", "Charlie"];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Học sinh của {user?.name}</Text>

        {students.map((s, i) => (
          <View key={i} style={[styles.studentBox, { backgroundColor: colors.surface }]}>
            <Text style={[styles.studentName, { color: colors.text }]}>{s}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  content:{flex:1,padding:16},
  title:{fontSize:20,fontWeight:"600",marginBottom:12},
  studentBox:{
    padding:16,
    borderRadius:12,
    marginBottom:12,
    shadowColor:"#000",
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.1,
    shadowRadius:2,
    elevation:2
  },
  studentName:{fontSize:16,fontWeight:"600"}
});
