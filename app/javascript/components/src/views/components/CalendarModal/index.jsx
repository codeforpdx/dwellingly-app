import 'react-calendar/dist/Calendar.css'
import Calendar from "react-calendar";
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from '../Modal';

export default function CalendarModal({ calendarState, handleCalendarConfirm, title = "Date Range", iconYPosition = "", resetOnClose = true }) {
  const { dateTimeStart, dateTimeEnd, setStart, setEnd } = calendarState

  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [tempStart, setTempStart] = useState(dateTimeStart)
  const [tempEnd, setTempEnd] = useState(dateTimeEnd)

  const validRange = tempStart < tempEnd

  useEffect(() => {
    setTempStart(typeof dateTimeStart === "string" ? new Date(dateTimeStart) : dateTimeStart);
    setTempEnd(typeof dateTimeEnd === "string" ? new Date(dateTimeEnd) : dateTimeEnd);
  }, [dateTimeStart, dateTimeEnd]);

  const handleConfirm = () => {
    if (validRange) {
      setIsError(false)
      setStart(tempStart)
      setEnd(tempEnd)
      setIsOpen(false)
    } else {
      setIsError(true)
    }
  }
  const handleCancel = () => {
    if (resetOnClose) {
      setTempStart(dateTimeStart)
      setTempEnd(dateTimeEnd)
    }
    setIsOpen(false)
    setIsError(false)
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
      closeHandler={handleCancel}
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
        {isError && <aside className="error-message">End Date must come after the Start Date</aside>}
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

const today = new Date();

export function useCalendarState(startDateInit = today, endDateInit = today) {
  const [dateTimeStart, setStart] = useState(startDateInit)
  const [dateTimeEnd, setEnd] = useState(endDateInit)
  const resetDates = () => {
    setStart(typeof startDateInit === "string" ? new Date(startDateInit) : startDateInit);
    setEnd(typeof endDateInit === "string" ? new Date(endDateInit) : endDateInit);
  };

  useEffect(() => {
    setStart(typeof startDateInit === "string" ? new Date(startDateInit) : startDateInit);
  }, [startDateInit]);

  useEffect(() => {
    setEnd(typeof endDateInit === "string" ? new Date(endDateInit) : endDateInit);
  }, [endDateInit]);

  return { dateTimeStart, dateTimeEnd, setStart, setEnd, resetDates }
}
