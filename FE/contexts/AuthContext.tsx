import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "teacher" | "user";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (newUser: Omit<User, "id" | "role">) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem("currentUser"); // ⚙️ đổi key cho nhất quán
        if (stored) setUser(JSON.parse(stored));
      } catch (err) {
        console.error("Lỗi khi load user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // 🟢 Tài khoản cố định
  const fixedAccounts: User[] = [
    {
      id: "t1",
      name: "Giáo viên",
      email: "teacher@gmail.com",
      phone: "000",
      password: "1",
      role: "teacher",
    },
    {
      id: "a1",
      name: "Quản trị viên",
      email: "admin@gmail.com",
      phone: "000",
      password: "123",
      role: "admin",
    },
  ];

  // 🟢 Đăng ký tài khoản user thường
  const register = async (newUser: Omit<User, "id" | "role">) => {
    const existing = JSON.parse((await AsyncStorage.getItem("users")) || "[]");
    const duplicate = existing.find(
      (u: User) => u.email === newUser.email || u.phone === newUser.phone
    );
    if (duplicate) throw new Error("Email hoặc số điện thoại đã được dùng!");

    const userWithRole: User = {
      id: Date.now().toString(),
      ...newUser,
      role: "user",
    };
    existing.push(userWithRole);
    await AsyncStorage.setItem("users", JSON.stringify(existing));
  };

  // 🟢 Đăng nhập
  const login = async (email: string, password: string): Promise<User> => {
    const fixedUser = fixedAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (fixedUser) {
      await AsyncStorage.setItem("currentUser", JSON.stringify(fixedUser));
      setUser(fixedUser);
      return fixedUser;
    }

    const storedUsersStr = await AsyncStorage.getItem("users");
    const storedUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];

    const found = storedUsers.find(
      (u: User) => u.email === email && u.password === password
    );
    if (!found) throw new Error("Email hoặc mật khẩu không đúng!");

    await AsyncStorage.setItem("currentUser", JSON.stringify(found));
    setUser(found);
    return found;
  };

  // 🟢 Đăng xuất
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải được dùng trong AuthProvider");
  return ctx;
};
