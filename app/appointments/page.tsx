
import { Metadata } from 'next'
import { useState } from 'react'
import { format, addDays, eachDayOfInterval, parse } from 'date-fns'

export const metadata: Metadata = {
  title: 'Book an Appointment - Buckalew Financial Services',
  description: 'Schedule a consultation with our financial advisors'
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availableTimeslots, setAvailableTimeslots] = useState([
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'
  ])
  const [selectedTimeslot, setSelectedTimeslot] = useState('')

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    // Fetch available timeslots for the selected date
    setAvailableTimeslots(['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'])
  }

  const handleTimeslotSelect = (timeslot: string) => {
    setSelectedTimeslot(timeslot)
  }

  const handleBookAppointment = () => {
    // Handle appointment booking logic
    console.log('Appointment booked:', {
      date: format(selectedDate, 'yyyy-MM-dd'),
      timeslot: selectedTimeslot
    })
  }

  return (
    // Appointment scheduling UI
  )
}
