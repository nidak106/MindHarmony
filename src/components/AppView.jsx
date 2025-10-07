import { Brain, MessageSquare, BarChart3, Calendar } from "lucide-react";
import ChatTab from "./ChatTab";
import DashboardTab from "./DashbardTab";
import AppointmentsTab from "./AppointmentsTab";

function AppView({ setCurrentView, activeTab, setActiveTab, chatMessages, currentMessage, onSignOut,  setCurrentMessage, handleSendMessage, moodLogs, appointments }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center"   onClick={() => setCurrentView("hero")}>
              <Brain className="w-8 h-8 text-teal-500 mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Mind Harmony</h1>
            </div>
         
                <button
          onClick={onSignOut}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Log Out
        </button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md mx-auto">
          {[
            { id: "chat", label: "Chat", icon: MessageSquare },
            { id: "dashboard", label: "Dashboard", icon: BarChart3 },
            { id: "appointments", label: "Appointments", icon: Calendar },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === id
                  ? "bg-white text-teal-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6 min-h-96">
            {activeTab === "chat" && (
              <ChatTab
                chatMessages={chatMessages}
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
                handleSendMessage={handleSendMessage}
              />
            )}
            {activeTab === "dashboard" && <DashboardTab moodLogs={moodLogs} />}
            {activeTab === "appointments" && <AppointmentsTab appointments={appointments} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppView;
