// client/src/services/EventsAPI.jsx

const API_URL = '/api/events'

const getAllEvents = async () => {
    const response = await fetch(API_URL)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

const getEventById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

const getEventsByLocationId = async (locationId) => {
    const response = await fetch(`${API_URL}/location/${locationId}`)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

export default {
    getAllEvents,
    getEventById,
    getEventsByLocationId
}