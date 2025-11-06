import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1️⃣ Định nghĩa kiểu dữ liệu user
export interface User {
  email: string;
  role: "student" | "teacher" | "admin";
  provider?: string;
}

// 2️⃣ Định nghĩa kiểu dữ liệu cho context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userInfo: User) => Promise<void>;
  logout: () => Promise<void>;
}

// 3️⃣ Tạo context có kiểu dữ liệu rõ ràng
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4️⃣ Provider bao quanh toàn bộ ứng dụng
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("currentUser");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userInfo: User) => {
    setUser(userInfo);
    await AsyncStorage.setItem("user", JSON.stringify(userInfo));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5️⃣ Hook để các component khác gọi được
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
