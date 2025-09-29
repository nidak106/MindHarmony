import { User, Calendar, Video } from "lucide-react";

function AppointmentsTab({ appointments }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Upcoming Sessions</h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
          >
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
}

export default AppointmentsTab;
