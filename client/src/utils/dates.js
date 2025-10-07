// client/src/utils/dates.js

import { format, formatDistanceToNow, isPast } from 'date-fns'

// Helper function to create and validate a Date object
const createValidDateTime = (dateString, timeString) => {
    if (!dateString || !timeString) {
        return null;
    }
    
    // Combine date and time for correct parsing
    const dateTime = new Date(`${dateString}T${timeString}`);
    
    // Check if the date is invalid (NaN stands for Not a Number/Invalid Date)
    if (isNaN(dateTime.getTime())) {
        return null;
    }
    return dateTime;
};

// Format time from 'HH:MM:SS' to 'h:mm a'
const formatTime = (timeString) => {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    
    if (isNaN(date.getTime())) return ''
    
    return format(date, 'h:mm a')
}

// Format the date part for display (e.g. Oct 20th, 2025)
const formatDateDisplay = (dateString) => {
    const date = dateString ? new Date(dateString) : null;
    return (date && !isNaN(date.getTime())) ? format(date, 'MMM do, yyyy') : 'TBD';
}

// Stretch Feature: Calculate time remaining
const getRemainingTime = (dateString, timeString) => {
    const dateTime = createValidDateTime(dateString, timeString);
    if (!dateTime) return 'Date/Time Unknown' 

    if (isPast(dateTime)) {
        return 'Event has passed'
    } else {
        const distance = formatDistanceToNow(dateTime, { addSuffix: true })
        return `Starts ${distance}`
    }
}

const isEventPassed = (dateString, timeString) => {
    const dateTime = createValidDateTime(dateString, timeString);
    if (!dateTime) return true 

    return isPast(dateTime)
}

export default {
    formatTime,
    formatDateDisplay,
    getRemainingTime,
    isEventPassed
}