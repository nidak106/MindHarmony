import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import AppView from "./components/AppView";
import AuthForm from "./components/AuthForm";

const DUMMY_APPOINTMENTS = [
{
id: "1",
therapistName: "Dr. Sarah Johnson",
date: "2025-01-20",
time: "2:00 PM",
meetUrl: "[https://meet.google.com/abc-defg-hij](https://meet.google.com/abc-defg-hij)",
},
{
id: "2",
therapistName: "Dr. Michael Chen",
date: "2025-01-22",
time: "10:30 AM",
meetUrl: "[https://meet.google.com/xyz-uvwx-rst](https://meet.google.com/xyz-uvwx-rst)",
},
{
id: "3",
therapistName: "Dr. Emily Rodriguez",
date: "2025-01-25",
time: "4:00 PM",
meetUrl: "[https://meet.google.com/lmn-opqr-stu](https://meet.google.com/lmn-opqr-stu)",
},
];

function App() {
const [currentView, setCurrentView] = useState("hero"); // 🏠 Start with Hero page
const [isAuthenticated, setIsAuthenticated] = useState(false);

const [activeTab, setActiveTab] = useState("chat");
const [chatMessages, setChatMessages] = useState([]);
const [currentMessage, setCurrentMessage] = useState("");
const [moodLogs, setMoodLogs] = useState([]);
const [appointments] = useState(DUMMY_APPOINTMENTS);

// ✅ Successful login/signup
const handleAuthSuccess = () => {
setIsAuthenticated(true);
setCurrentView("app");
};

// 🚪 Handle sign-out
const handleSignOut = () => {
setIsAuthenticated(false);
setCurrentView("hero");
localStorage.removeItem("mindHarmony_auth");
};

// 🔁 Load saved data
useEffect(() => {
const savedMessages = localStorage.getItem("mindHarmony_chat");
const savedMoodLogs = localStorage.getItem("mindHarmony_moods");
const savedAuth = localStorage.getItem("mindHarmony_auth");


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

// 🕒 Only remember auth state, but don't auto-open the app
if (savedAuth === "true") {
  setIsAuthenticated(true);
}


}, []);

// 💾 Save data
useEffect(() => {
localStorage.setItem("mindHarmony_chat", JSON.stringify(chatMessages));
}, [chatMessages]);

useEffect(() => {
localStorage.setItem("mindHarmony_moods", JSON.stringify(moodLogs));
}, [moodLogs]);

useEffect(() => {
localStorage.setItem("mindHarmony_auth", isAuthenticated);
}, [isAuthenticated]);

// 🎭 Mood detection
const detectMood = (message) => {
const lower = message.toLowerCase();
const pos = ["happy", "great", "good", "wonderful", "amazing", "excellent", "fantastic", "joy", "love", "excited"];
const neg = ["sad", "depressed", "anxious", "worried", "stressed", "angry", "upset", "frustrated", "lonely", "hopeless"];

const hasPos = pos.some((w) => lower.includes(w));
const hasNeg = neg.some((w) => lower.includes(w));

if (hasPos && !hasNeg) return "positive";
if (hasNeg && !hasPos) return "negative";
return "neutral";


};

// 🤖 Simple AI response
const getAIResponse = (message) => {
const lower = message.toLowerCase();


if (lower.includes("sad") || lower.includes("depressed") || lower.includes("anxious"))
  return "I'm sorry to hear that. Would you like me to schedule a session with your therapist? 💙";
if (lower.includes("happy") || lower.includes("great") || lower.includes("wonderful"))
  return "That's wonderful! Keep it up 🌟";
if (lower.includes("stressed") || lower.includes("overwhelmed"))
  return "I understand you're feeling stressed. Have you tried some deep breathing exercises? 🧘‍♀️";
if (lower.includes("help"))
  return "I'm here to help you. Whether you need someone to listen or connect with a professional, I'm with you 💚";

return "I understand. Tell me more about how you're feeling today. 🤗";


};

// 💬 Handle sending a message
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

// 🔄 View rendering logic
if (currentView === "hero") {
return <HeroSection setCurrentView={setCurrentView} isAuthenticated={isAuthenticated} />;
}

if (currentView === "auth" || (currentView === "app" && !isAuthenticated)) {
return <AuthForm onSuccess={handleAuthSuccess} setCurrentView={setCurrentView} />;
}

if (currentView === "app" && isAuthenticated) {
return (
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
onSignOut={handleSignOut} // ✅ Pass logout handler
/>
);
}

return <HeroSection setCurrentView={setCurrentView} />;
}

export default App;
