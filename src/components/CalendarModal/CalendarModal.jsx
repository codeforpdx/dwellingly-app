import 'react-calendar/dist/Calendar.css'
import Calendar from "react-calendar";
import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import './calendarModal.scss'
import Modal from '../Modal';
import { useEffect } from 'react';

export default function CalendarModal({ calendarState, title = "Date Range", iconYPosition = "" }) {
  const [isOpen, setIsOpen] = useState(false)

  const { startDate, endDate, setStart, setEnd } = calendarState

  return (<div className="calendarModal">
    <FontAwesomeIcon
      className={`calendar__icon ${isOpen && 'open'}`}
      style={{ top: iconYPosition }}
      size={"lg"}
      icon={faCalendarAlt}
      onClick={() => setIsOpen(true)} />
    {isOpen && (<Modal
      titleText={title}
      closeHandler={() => setIsOpen(false)}
      content={<div className="calendar__container">
        <label>
          Start Date
        <Calendar
            className="calendar__input"
            onChange={setStart}
            value={startDate} />
        </label>
        <label>
          End Date
        <Calendar
            className="calendar__input"
            onChange={setEnd}
            value={endDate} />
        </label>
      </div>
      }
    />)
    }
  </div >)
}

const today = new Date()
export function useCalendarState() {
  const [startDate, setStart] = useState(today)
  const [endDate, setEnd] = useState(today)

  return { startDate, endDate, setStart, setEnd }
}