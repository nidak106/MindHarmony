import { useState } from "react";
import { Brain, Send } from "lucide-react";

function ChatTab({ chatMessages, currentMessage, setCurrentMessage, handleSendMessage }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg mb-4">
        {chatMessages.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <p className="text-gray-500">Start a conversation. I'm here to listen. 💙</p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? "bg-teal-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 shadow-sm rounded-bl-none border"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${message.isUser ? "text-teal-100" : "text-gray-500"}`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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
}

export default ChatTab;
