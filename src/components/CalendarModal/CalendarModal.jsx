import 'react-calendar/dist/Calendar.css'
import Calendar from "react-calendar";
import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import './calendarModal.scss'
import Modal from '../Modal';

export default function CalendarModal({ dateRange, setDateRange, title = "Date Range" }) {
  const [isOpen, setIsOpen] = useState(false)

  return (<div>
    <FontAwesomeIcon
      className={`calendar__icon ${isOpen && 'open'}`}
      size={"lg"}
      icon={faCalendarAlt}
      onClick={() => setIsOpen(true)} />
    {isOpen && (<Modal
      titleText={title}
      closeHandler={() => setIsOpen(false)}
      content={
        <Calendar
          onChange={setDateRange}
          value={dateRange}
          selectRange />}
    />)
    }
  </div >)
}

const today = new Date()
export function useCalendarState() {
  const [dateRange, setDateRange] = useState([today, today])

  return [dateRange, setDateRange]
}