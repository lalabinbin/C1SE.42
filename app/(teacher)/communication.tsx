import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

export default function CommunicationScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Liên lạc - {user?.name}</Text>

        {["Chat lớp A","Q&A lớp B"].map((item,i)=>(
          <TouchableOpacity key={i} style={[styles.commBox,{backgroundColor:colors.surface}]}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.primary}/>
            <Text style={[styles.commTitle,{color:colors.text}]}>{item}</Text>
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
  commBox:{
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
  commTitle:{fontSize:16,fontWeight:"600"}
});
