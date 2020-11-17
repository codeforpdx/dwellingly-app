import 'react-calendar/dist/Calendar.css'
import Calendar from "react-calendar";
import React, { useState } from 'react';

const today = new Date()
export default function CalendarModal({ dateRange, setDateRange }) {



  return <div>
    <Calendar onChange={setDateRange} value={dateRange} selectRange />
  </div>
}

export function useCalendarState() {
  const [dateRange, setDateRange] = useState([today, today])

  return [dateRange, setDateRange]
}