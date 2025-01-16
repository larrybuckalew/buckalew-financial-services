import { useState } from 'react';
import { Card } from '@/components/ui/card';

export default function MeetingScheduler() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingType, setMeetingType] = useState('video');

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM'
  ];

  const handleSchedule = async () => {
    try {
      const response = await fetch('/api/meetings/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          type: meetingType
        })
      });

      if (response.ok) {
        alert('Meeting scheduled successfully!');
      }
    } catch (error) {
      console.error('Scheduling failed:', error);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Schedule a Meeting</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a time</option>
            {availableTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Meeting Type</label>
          <select
            value={meetingType}
            onChange={(e) => setMeetingType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="video">Video Call</option>
            <option value="phone">Phone Call</option>
            <option value="inPerson">In-Person</option>
          </select>
        </div>

        <button
          onClick={handleSchedule}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Schedule Meeting
        </button>
      </div>
    </Card>
  );
}
