import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import AppView from "./components/AppView";

const DUMMY_APPOINTMENTS = [
  {
    id: "1",
    therapistName: "Dr. Sarah Johnson",
    date: "2025-01-20",
    time: "2:00 PM",
    meetUrl: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    therapistName: "Dr. Michael Chen",
    date: "2025-01-22",
    time: "10:30 AM",
    meetUrl: "https://meet.google.com/xyz-uvwx-rst",
  },
  {
    id: "3",
    therapistName: "Dr. Emily Rodriguez",
    date: "2025-01-25",
    time: "4:00 PM",
    meetUrl: "https://meet.google.com/lmn-opqr-stu",
  },
];

function App() {
  const [currentView, setCurrentView] = useState("hero");
  const [activeTab, setActiveTab] = useState("chat");
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [moodLogs, setMoodLogs] = useState([]);
  const [appointments] = useState(DUMMY_APPOINTMENTS);

  // Load from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("mindHarmony_chat");
    const savedMoodLogs = localStorage.getItem("mindHarmony_moods");

    if (savedMessages) {
      setChatMessages(
        JSON.parse(savedMessages).map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
      );
    }

    if (savedMoodLogs) {
      setMoodLogs(JSON.parse(savedMoodLogs));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("mindHarmony_chat", JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem("mindHarmony_moods", JSON.stringify(moodLogs));
  }, [moodLogs]);

  // Mood detection
  const detectMood = (message) => {
    const lowerMessage = message.toLowerCase();
    const positiveWords = [
      "happy",
      "great",
      "good",
      "wonderful",
      "amazing",
      "excellent",
      "fantastic",
      "joy",
      "love",
      "excited",
    ];
    const negativeWords = [
      "sad",
      "depressed",
      "anxious",
      "worried",
      "stressed",
      "angry",
      "upset",
      "frustrated",
      "lonely",
      "hopeless",
    ];

    const hasPositive = positiveWords.some((word) => lowerMessage.includes(word));
    const hasNegative = negativeWords.some((word) => lowerMessage.includes(word));

    if (hasPositive && !hasNegative) return "positive";
    if (hasNegative && !hasPositive) return "negative";
    return "neutral";
  };

  // AI response
  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("anxious")) {
      return "I'm sorry to hear that. Would you like me to schedule a session with your therapist? 💙";
    }
    if (lowerMessage.includes("happy") || lowerMessage.includes("great") || lowerMessage.includes("wonderful")) {
      return "That's wonderful! Keep it up 🌟";
    }
    if (lowerMessage.includes("stressed") || lowerMessage.includes("overwhelmed")) {
      return "I understand you're feeling stressed. Have you tried some deep breathing exercises? I'm here to listen. 🧘‍♀️";
    }
    if (lowerMessage.includes("help")) {
      return "I'm here to help you. Whether you need someone to listen or want to connect with a professional, I'm with you every step of the way. 💚";
    }
    return "I understand. Tell me more about how you're feeling today. 🤗";
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date(),
    };

    const mood = detectMood(currentMessage);
    const moodLog = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      mood,
      message: currentMessage,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setMoodLogs((prev) => [...prev, moodLog]);

    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(currentMessage),
        isUser: false,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setCurrentMessage("");
  };

  return currentView === "hero" ? (
    <HeroSection setCurrentView={setCurrentView} />
  ) : (
    <AppView
      setCurrentView={setCurrentView}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      chatMessages={chatMessages}
      currentMessage={currentMessage}
      setCurrentMessage={setCurrentMessage}
      handleSendMessage={handleSendMessage}
      moodLogs={moodLogs}
      appointments={appointments}
    />
  );
}

export default App;
