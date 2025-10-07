// client/src/services/LocationsAPI.jsx

const API_URL = '/api/locations'

const getAllLocations = async () => {
    const response = await fetch(API_URL)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

const getLocationById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

export default {
    getAllLocations,
    getLocationById
}