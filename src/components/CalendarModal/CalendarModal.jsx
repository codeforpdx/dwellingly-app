import 'react-calendar/dist/Calendar.css'
import Calendar from "react-calendar";
import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import './calendarModal.scss'
import Modal from '../Modal';

export default function CalendarModal({ calendarState, title = "Date Range", iconYPosition = "", resetOnClose = true }) {
  const { startDate, endDate, setStart, setEnd } = calendarState

  const [isOpen, setIsOpen] = useState(false)
  const [tempStart, setTempStart] = useState(startDate)
  const [tempEnd, setTempEnd] = useState(endDate)

  const handleConfirm = () => {
    setStart(tempStart)
    setEnd(tempEnd)
    setIsOpen(false)
  }
  const handleCancel = () => {
    if (resetOnClose) {
      setTempStart(startDate)
      setTempEnd(endDate)
    }
    setIsOpen(false)
  }

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
      hasButtons
      confirmText="Confirm"
      cancelText="Cancel"
      confirmButtonHandler={handleConfirm}
      cancelButtonHandler={handleCancel}
      content={<div className="calendar__container">
        <div>
          <label>Start Date</label>
          <Calendar
            className="calendar__input"
            onChange={setTempStart}
            value={tempStart} />
        </div>
        <div>
          <label>End Date</label>
          <Calendar
            className="calendar__input"
            onChange={setTempEnd}
            value={tempEnd} />
        </div>
      </div>
      }
    />)
    }
  </div >)
}

const today = new Date()
export function useCalendarState(startDateInit = today, endDateInit = today) {
  const [startDate, setStart] = useState(startDateInit)
  const [endDate, setEnd] = useState(endDateInit)

  return { startDate, endDate, setStart, setEnd }
}