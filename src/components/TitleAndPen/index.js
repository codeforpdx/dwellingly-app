import React, { useState } from "react"

import './titleAndPen.scss';

export function useEditingStatus() {
  const [isEditing, setEditingStatus] = useState(false)
  return { isEditing, setEditingStatus }
}

export default function TitleAndPen({ manager, isEditing, setEditingStatus }) {
  return (
    <div className="title__container">
      <h2>
        {manager.firstName} {manager.lastName}
      </h2>
      <button
        className={`rounded${isEditing ? "--is-editing" : ""}`}
        onClick={() => setEditingStatus(prevBool => !prevBool)}
        disabled={isEditing}
      >
        <i className="fas fa-pen icon"></i>
      </button>
    </div >
  )
}