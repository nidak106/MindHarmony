import { BarChart3 } from "lucide-react";

function DashboardTab({ moodLogs }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Mood Journey</h2>
      {moodLogs.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            No mood logs yet. Start chatting to track your emotional well-being!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {moodLogs.slice(-10).reverse().map((log) => (
            <div key={log.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    log.mood === "positive"
                      ? "bg-green-100 text-green-800"
                      : log.mood === "negative"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {log.mood === "positive"
                    ? "😊 Positive"
                    : log.mood === "negative"
                    ? "😔 Negative"
                    : "😐 Neutral"}
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
}

export default DashboardTab;
