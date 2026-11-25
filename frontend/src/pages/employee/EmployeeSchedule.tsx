import { Calendar, Clock, MapPin } from 'lucide-react'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const schedule = [
  {
    id: 1,
    day: 'Mon',
    date: '2026-03-30',
    events: [
      {
        time: '09:00 AM',
        title: 'Team Standup',
        type: 'meeting',
        duration: '30 min',
        location: 'Conference Room A',
      },
      {
        time: '11:00 AM',
        title: 'Project Review',
        type: 'meeting',
        duration: '1 hour',
        location: 'Zoom',
      },
      {
        time: '02:00 PM',
        title: 'Development Work',
        type: 'task',
        duration: '2 hours',
        location: 'Desk',
      },
    ],
  },
  {
    id: 2,
    day: 'Tue',
    date: '2026-03-31',
    events: [
      {
        time: '10:00 AM',
        title: 'Client Presentation',
        type: 'meeting',
        duration: '1 hour',
        location: 'Board Room',
      },
      {
        time: '01:00 PM',
        title: 'Code Review',
        type: 'task',
        duration: '2 hours',
        location: 'Desk',
      },
      {
        time: '04:00 PM',
        title: '1-on-1 with Manager',
        type: 'meeting',
        duration: '30 min',
        location: 'Manager Office',
      },
    ],
  },
  {
    id: 3,
    day: 'Wed',
    date: '2026-04-01',
    events: [
      {
        time: '09:00 AM',
        title: 'Team Standup',
        type: 'meeting',
        duration: '30 min',
        location: 'Conference Room A',
      },
      {
        time: '11:30 AM',
        title: 'Design Review',
        type: 'meeting',
        duration: '1 hour',
        location: 'Zoom',
      },
      {
        time: '03:00 PM',
        title: 'Sprint Planning',
        type: 'meeting',
        duration: '2 hours',
        location: 'Conference Room B',
      },
    ],
  },
  {
    id: 4,
    day: 'Thu',
    date: '2026-04-02',
    events: [
      {
        time: '10:00 AM',
        title: 'Feature Development',
        type: 'task',
        duration: '3 hours',
        location: 'Desk',
      },
      {
        time: '02:00 PM',
        title: 'Team Retrospective',
        type: 'meeting',
        duration: '1 hour',
        location: 'Conference Room A',
      },
    ],
  },
  {
    id: 5,
    day: 'Fri',
    date: '2026-04-03',
    events: [
      {
        time: '09:00 AM',
        title: 'Team Standup',
        type: 'meeting',
        duration: '30 min',
        location: 'Conference Room A',
      },
      {
        time: '11:00 AM',
        title: 'Bug Fixing',
        type: 'task',
        duration: '2 hours',
        location: 'Desk',
      },
      {
        time: '03:00 PM',
        title: 'Weekly Review',
        type: 'meeting',
        duration: '1 hour',
        location: 'Zoom',
      },
    ],
  },
]

export default function EmployeeSchedule() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">My Schedule</h1>
        <p className="text-[15px] text-[#9CA3AF]">Your weekly calendar and upcoming events</p>
      </div>

      {/* Week Overview */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0]">
            Week of March 30 - April 3, 2026
          </h2>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#9CA3AF]" />
            <span className="text-[15px] text-[#9CA3AF]">Current Week</span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {schedule.map((day) => (
            <div key={day.id} className="space-y-2">
              {/* Day Header */}
              <div className="text-center pb-3 border-b border-[#333333]">
                <div className="text-[15px] font-semibold text-[#E0E0E0]">{day.day}</div>
                <div className="text-[13px] text-[#9CA3AF]">{day.date}</div>
              </div>

              {/* Events Count */}
              <div className="text-center py-3 bg-[#1F1F1F] rounded-lg">
                <div className="text-[20px] font-semibold text-[#009F8E]">{day.events.length}</div>
                <div className="text-[13px] text-[#9CA3AF]">Events</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Schedule */}
      <div className="space-y-6">
        {schedule.map((day) => (
          <div
            key={day.id}
            className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden"
          >
            <div className="px-6 py-4 bg-[#1F1F1F] border-b border-[#333333]">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-[#E0E0E0]">
                  {day.day}, {day.date}
                </h3>
                <span className="text-[14px] text-[#9CA3AF]">{day.events.length} events</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {day.events.map((event, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 rounded-lg border border-[#333333] hover:border-[#444444] hover:bg-[#1F1F1F] transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-20 pt-1">
                    <div className="flex items-center gap-2 text-[14px] text-[#9CA3AF]">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-[15px] font-semibold text-[#E0E0E0] mb-2">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-4 text-[13px] text-[#9CA3AF]">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {event.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <span
                        className="px-2.5 py-1 rounded-md text-[13px] font-medium"
                        style={{
                          backgroundColor: event.type === 'meeting' ? '#12C4D31A' : '#6B72801A',
                          color: event.type === 'meeting' ? '#12C4D3' : '#9CA3AF',
                        }}
                      >
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
