import React, { useState, useEffect } from 'react';
import { Brain, MessageSquare, BarChart3, Calendar, Send, User, Video, Heart } from 'lucide-react';

const DUMMY_APPOINTMENTS = [
  {
    id: '1',
    therapistName: 'Dr. Sarah Johnson',
    date: '2025-01-20',
    time: '2:00 PM',
    meetUrl: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: '2',
    therapistName: 'Dr. Michael Chen',
    date: '2025-01-22',
    time: '10:30 AM',
    meetUrl: 'https://meet.google.com/xyz-uvwx-rst'
  },
  {
    id: '3',
    therapistName: 'Dr. Emily Rodriguez',
    date: '2025-01-25',
    time: '4:00 PM',
    meetUrl: 'https://meet.google.com/lmn-opqr-stu'
  }
];

function App() {
  const [currentView, setCurrentView] = useState('hero');
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [moodLogs, setMoodLogs] = useState([]);
  const [appointments] = useState(DUMMY_APPOINTMENTS);

  useEffect(() => {
    const savedMessages = localStorage.getItem('mindHarmony_chat');
    const savedMoodLogs = localStorage.getItem('mindHarmony_moods');
    
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages).map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }
    
    if (savedMoodLogs) {
      setMoodLogs(JSON.parse(savedMoodLogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mindHarmony_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('mindHarmony_moods', JSON.stringify(moodLogs));
  }, [moodLogs]);

  const detectMood = (message) => {
    const lowerMessage = message.toLowerCase();
    const positiveWords = ['happy', 'great', 'good', 'wonderful', 'amazing', 'excellent', 'fantastic', 'joy', 'love', 'excited'];
    const negativeWords = ['sad', 'depressed', 'anxious', 'worried', 'stressed', 'angry', 'upset', 'frustrated', 'lonely', 'hopeless'];
    
    const hasPositive = positiveWords.some(word => lowerMessage.includes(word));
    const hasNegative = negativeWords.some(word => lowerMessage.includes(word));
    
    if (hasPositive && !hasNegative) return 'positive';
    if (hasNegative && !hasPositive) return 'negative';
    return 'neutral';
  };

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('anxious')) {
      return "I'm sorry to hear that. Would you like me to schedule a session with your therapist? 💙";
    }
    if (lowerMessage.includes('happy') || lowerMessage.includes('great') || lowerMessage.includes('wonderful')) {
      return "That's wonderful! Keep it up 🌟";
    }
    if (lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed')) {
      return "I understand you're feeling stressed. Have you tried some deep breathing exercises? I'm here to listen. 🧘‍♀️";
    }
    if (lowerMessage.includes('help')) {
      return "I'm here to help you. Whether you need someone to listen or want to connect with a professional, I'm with you every step of the way. 💚";
    }
    return "I understand. Tell me more about how you're feeling today. 🤗";
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    const mood = detectMood(currentMessage);
    const moodLog = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      mood,
      message: currentMessage
    };

    setChatMessages(prev => [...prev, userMessage]);
    setMoodLogs(prev => [...prev, moodLog]);

    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(currentMessage),
        isUser: false,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setCurrentMessage('');
  };

  const HeroSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
          Mind <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Harmony</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Your AI companion for mental well-being
        </p>
        <button
          onClick={() => setCurrentView('app')}
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-blue-600 rounded-full hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started
          <Heart className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const ChatTab = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg mb-4">
        {chatMessages.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <p className="text-gray-500">Start a conversation. I'm here to listen. 💙</p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isUser 
                  ? 'bg-teal-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 shadow-sm rounded-bl-none border'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.isUser ? 'text-teal-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="How are you feeling today?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200 flex items-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const DashboardTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Mood Journey</h2>
      {moodLogs.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No mood logs yet. Start chatting to track your emotional well-being!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {moodLogs.slice(-10).reverse().map((log) => (
            <div key={log.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  log.mood === 'positive' ? 'bg-green-100 text-green-800' :
                  log.mood === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {log.mood === 'positive' ? '😊 Positive' :
                   log.mood === 'negative' ? '😔 Negative' :
                   '😐 Neutral'}
                </span>
                <span className="text-sm text-gray-500">{log.date}</span>
              </div>
              <p className="text-gray-700 text-sm">{log.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const AppointmentsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Upcoming Sessions</h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <User className="w-5 h-5 text-teal-500 mr-2" />
                  <h3 className="font-semibold text-gray-800">{appointment.therapistName}</h3>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {appointment.date} at {appointment.time}
                </div>
              </div>
              <a
                href={appointment.meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
              >
                <Video className="w-4 h-4 mr-2" />
                Join Meet
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AppView = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-teal-500 mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Mind Harmony</h1>
            </div>
            <button
              onClick={() => setCurrentView('hero')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md mx-auto">
          {[
            { id: 'chat', label: 'Chat', icon: MessageSquare },
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'appointments', label: 'Appointments', icon: Calendar }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === id
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6 min-h-96">
            {activeTab === 'chat' && <ChatTab />}
            {activeTab === 'dashboard' && <DashboardTab />}
            {activeTab === 'appointments' && <AppointmentsTab />}
          </div>
        </div>
      </div>
    </div>
  );

  return currentView === 'hero' ? <HeroSection /> : <AppView />;
}

export default App;
