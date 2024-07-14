import React, { useState, useEffect } from 'react';
import { Clock, Globe } from 'lucide-react';

const WorkSchedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const baseHours = Array.from({ length: 9 }, (_, i) => i + 9); // 9 AM to 5 PM

  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [availableTimezones, setAvailableTimezones] = useState([]);
  const [hours, setHours] = useState(baseHours);

  useEffect(() => {
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setSelectedTimezone(userTimezone);

    // Get list of available timezones
    const tzList = Intl.supportedValuesOf('timeZone');
    setAvailableTimezones(tzList);
  }, []);

  useEffect(() => {
    // Update hours based on selected timezone
    if (selectedTimezone) {
      const newHours = baseHours.map(hour => {
        const date = new Date();
        date.setHours(hour, 0, 0, 0);
        return parseInt(date.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: selectedTimezone }));
      });
      setHours(newHours);
    }
  }, [selectedTimezone]);

  const schedule = {
    Monday: { start: '9:00', lunch: '12:00-13:00', activities: { '14:00': 'Team Meeting' }, afk: ['11:00'] },
    Tuesday: { start: '9:00', lunch: '12:30-13:30', activities: { '10:00': 'Client Call' }, afk: [] },
    Wednesday: { start: '9:00', lunch: '12:00-13:00', activities: {}, afk: ['15:00', '16:00'] },
    Thursday: { start: '9:00', lunch: '12:00-13:00', activities: { '15:00': 'Training Session' }, afk: [] },
    Friday: { start: '9:00', lunch: '12:00-13:00', activities: { '16:00': 'Weekly Review' }, afk: ['10:00'] },
  };

  // Get the current day
  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

  const ColorLegend = ({ color, label }) => (
    <div className="flex items-center mr-4 mb-2">
      <div className={`w-4 h-4 ${color} mr-2`}></div>
      <span className="text-sm">{label}</span>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Weekly Work Schedule</h1>
        <div className="flex items-center">
          <Globe className="inline-block w-4 h-4 mr-2" />
          <select 
            value={selectedTimezone} 
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="border rounded p-1 text-sm"
          >
            {availableTimezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 mb-4">
        <div className="font-semibold text-gray-900">Time</div>
        {days.map(day => (
          <div key={day} className={`font-semibold ${day === currentDay ? 'bg-blue-100 rounded-t-lg p-1' : 'text-gray-800'}`}>
            {day}
          </div>
        ))}
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <div className="text-sm text-gray-900">{`${hour}:00`}</div>
            {days.map(day => (
              <div key={`${day}-${hour}`} className={`border p-1 text-sm ${day === currentDay ? 'bg-blue-50' : ''}`}>
                {schedule[day].start === `${hour}:00` && (
                  <div className="bg-green-100 p-1 rounded text-black">
                    <Clock className="inline-block w-4 h-4 mr-1" />
                    Start
                  </div>
                )}
                {schedule[day].lunch.startsWith(`${hour}:00`) && (
                  <div className="bg-yellow-100 text-black p-1 rounded">Lunch</div>
                )}
                {schedule[day].activities[`${hour}:00`] && (
                  <div className="bg-blue-100 text-black p-1 rounded">
                    {schedule[day].activities[`${hour}:00`]}
                  </div>
                )}
                {schedule[day].afk.includes(`${hour}:00`) && (
                  <div className="bg-red-100 text-black p-1 rounded">AFK</div>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="flex flex-wrap mt-4 text-black">
        <ColorLegend color="bg-green-100" label="Start Time" />
        <ColorLegend color="bg-yellow-100" label="Lunch Time" />
        <ColorLegend color="bg-blue-100" label="Scheduled Activity" />
        <ColorLegend color="bg-red-100" label="AFK (Away from Keyboard)" />
        <ColorLegend color="bg-blue-50" label="Current Day" />
      </div>
    </div>
  );
};

export default WorkSchedule;