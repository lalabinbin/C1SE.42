import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
const translations: Record<string, Record<string, string>> = {
  en: {
    "home.title": "Home",
    "home.welcome": "Welcome back, {name}!",
    "home.selectLanguage": "Select Language",
    "home.selectTheme": "Select Theme",
    "home.light": "Light",
    "home.dark": "Dark",
    "home.auto": "Auto",
    "home.ready": "Ready to continue your learning journey?",
    "home.beginner": "Beginner",
    "home.newLesson": "New Lesson",
    "home.vietnameseAlphabet": "Vietnamese Alphabet",
    "home.alphabetDesc": "Learn the basic Vietnamese letters and sounds.",
    "home.startLearning": "Start Learning",
    "home.exploreMore": "Explore More",
    "home.pronunciation": "Pronunciation",
    "home.pronunciationDesc": "Practice your pronunciation with fun exercises.",
    "home.games": "Games",
    "home.gamesDesc": "Play and learn Vietnamese with games!",
  },
  vi: {
    "home.title": "Trang chủ",
    "home.welcome": "Chào mừng trở lại, {name}!",
    "home.selectLanguage": "Chọn ngôn ngữ",
    "home.selectTheme": "Chọn giao diện",
    "home.light": "Sáng",
    "home.dark": "Tối",
    "home.auto": "Tự động",
    "home.ready": "Sẵn sàng học tiếp chưa?",
    "home.beginner": "Người mới bắt đầu",
    "home.newLesson": "Bài học mới",
    "home.vietnameseAlphabet": "Bảng chữ cái tiếng Việt",
    "home.alphabetDesc": "Học các chữ cái và âm cơ bản của tiếng Việt.",
    "home.startLearning": "Bắt đầu học",
    "home.exploreMore": "Khám phá thêm",
    "home.pronunciation": "Phát âm",
    "home.pronunciationDesc": "Luyện phát âm qua các bài tập thú vị.",
    "home.games": "Trò chơi",
    "home.gamesDesc": "Chơi và học tiếng Việt qua trò chơi!",
    
    "lesson.title": "Bài học",
    "lesson.subtitle": "Chọn bài học để bắt đầu",
    "lesson.vietnameseAlphabet": "Bảng chữ cái tiếng Việt",
    "lesson.alphabetDesc": "Học các chữ cái và âm cơ bản của tiếng Việt.",
    "lesson.startLearning": "Bắt đầu học",
    "lesson.exploreMore": "Khám phá thêm",
    "lesson.pronunciation": "Phát âm",
    "lesson.pronunciationDesc": "Luyện phát âm qua các bài tập thú vị.",
    "lesson.games": "Trò chơi",
    "lesson.gamesDesc": "Chơi và học tiếng Việt qua trò chơi!",
  },
  ko: {
    "home.title": "홈",
    "home.welcome": "{name}님, 환영합니다!",
    "home.selectLanguage": "언어 선택",
    "home.selectTheme": "테마 선택",
    "home.light": "라이트",
    "home.dark": "다크",
    "home.auto": "자동",
    "home.ready": "학습을 계속할 준비가 되었나요?",
    "home.beginner": "초보자",
    "home.newLesson": "새 수업",
    "home.vietnameseAlphabet": "베트남어 알파벳",
    "home.alphabetDesc": "베트남어 기본 문자와 소리를 배우세요.",
    "home.startLearning": "학습 시작",
    "home.exploreMore": "더 알아보기",
    "home.pronunciation": "발음",
    "home.pronunciationDesc": "재미있는 연습으로 발음을 연습하세요.",
    "home.games": "게임",
    "home.gamesDesc": "게임으로 베트남어를 배우세요!",
  },
  ja: {
    "home.title": "ホーム",
    "home.welcome": "おかえりなさい、{name}さん！",
    "home.ready": "今日はベトナム語を学ぶ準備はできましたか？",
    "home.beginner": "初級レベル",
    "home.newLesson": "新しいレッスン",
    "home.vietnameseAlphabet": "ベトナム語アルファベット",
    "home.alphabetDesc":
      "ベトナム語の29文字と発音を学びましょう。ベトナム語マスターへの旅を始めましょう。",
    "home.startLearning": "学習開始",
    "home.exploreMore": "もっと探検",
    "home.pronunciation": "発音練習",
    "home.pronunciationDesc":
      "AIフィードバックでベトナム語発音をマスターしましょう。",
    "home.games": "インタラクティブゲーム",
    "home.gamesDesc": "楽しく魅力的なゲームでベトナム語を学びましょう。",
  },
  zh: {
    "home.title": "首页",
    "home.welcome": "欢迎回来，{name}！",
    "home.ready": "准备好今天学习越南语了吗？",
    "home.beginner": "初级水平",
    "home.newLesson": "新课",
    "home.vietnameseAlphabet": "越南语字母表",
    "home.alphabetDesc": "学习越南语29个字母及其发音。开始您的越南语掌握之旅。",
    "home.startLearning": "开始学习",
    "home.exploreMore": "探索更多",
    "home.pronunciation": "发音练习",
    "home.pronunciationDesc": "通过AI反馈掌握越南语发音。",
    "home.games": "互动游戏",
    "home.gamesDesc": "通过有趣且引人入胜的游戏学习越南语。",
  },
};

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "vi",
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<string>("vi");

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      if (savedLang) setLanguageState(savedLang);
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: string) => {
    setLanguageState(lang);
    await AsyncStorage.setItem("appLanguage", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
