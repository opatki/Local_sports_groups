// client/src/components/Event.jsx (MODIFIED)

import React, { useState, useEffect } from 'react'
import dates from '../utils/dates' // Import the new utility file
import '../css/Event.css'

// The parent component now passes all necessary event data
const Event = ({ id, title, date, time, image, description }) => {

    const [formattedTime, setFormattedTime] = useState('')
    const [remainingTime, setRemainingTime] = useState('')
    const [isPastEvent, setIsPastEvent] = useState(false)
    const [formattedDate, setFormattedDate] = useState('') 

    useEffect(() => {
        // Format the time and calculate remaining time whenever date or time props change
        if (date && time) {
            setFormattedDate(dates.formatDateDisplay(date))
            setFormattedTime(dates.formatTime(time))
            setRemainingTime(dates.getRemainingTime(date, time))
            const past = dates.isEventPassed(date, time)
            setIsPastEvent(past)

            // Stretch feature: Apply different formatting for past events via CSS class
            // This replaces the old formatNegativeTimeRemaining logic
            const remainingElement = document.getElementById(`remaining-${id}`)
            if (remainingElement) {
                if (past) {
                    remainingElement.classList.add('negative-time-remaining')
                } else {
                    remainingElement.classList.remove('negative-time-remaining')
                }
            }
        }
    }, [date, time, id])

    return (
        <article className={`event-information ${isPastEvent ? 'past-event' : ''}`}>
            <img src={image} alt={title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {formattedDate} <br /> {formattedTime}</p>
                    {description && <p>{description}</p>}
                </div>
            </div>
        </article>
    )
}

export default Event