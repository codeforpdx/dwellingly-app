import React, { useState } from "react"

export function useEditingStatus() {
  const [isEditing, setEditingStatus] = useState(false)
  return { isEditing, setEditingStatus }
}

export default function TitleAndPen({ title, isEditing, setEditingStatus }) {
  return (
    <div className="title__container">
      <h2>
        {title}
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
