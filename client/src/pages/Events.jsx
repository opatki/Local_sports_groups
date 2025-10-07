// client/src/pages/Events.jsx (NEW FILE)

import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI' 
import Event from '../components/Event'
import '../css/Events.css' 

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all')

    useEffect(() => {
        (async () => {
            try {
                const allEvents = await EventsAPI.getAllEvents()
                setEvents(allEvents)
                const allLocations = await LocationsAPI.getAllLocations()
                setLocations(allLocations)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        })()
    }, [])

    // Logic to filter events based on selection
    const filteredEvents = events.filter(event => 
        selectedLocation === 'all' || 
        event.location_id === parseInt(selectedLocation)
    )

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value)
    }

    // Helper to find location name (optional but useful for display)
    const getLocationName = (locationId) => {
        const location = locations.find(loc => loc.id === locationId)
        return location ? location.name : 'Unknown Location'
    }

    return (
        <div className='all-events'>
            <header>
                <h2>All Upcoming Events</h2>
                <div className='filter-container'>
                    <label htmlFor="location-select">Filter by Location:</label>
                    <select id="location-select" value={selectedLocation} onChange={handleLocationChange}>
                        <option value="all">All Locations</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                    </select>
                </div>
            </header>

            <main>
                {
                    filteredEvents && filteredEvents.length > 0 ? filteredEvents.map((event) =>
                        <div key={event.id} className='event-with-location'>
                            <Event
                                id={event.id}
                                title={event.title}
                                date={event.date}
                                time={event.time}
                                image={event.image}
                                description={event.description}
                            />
                            <p className='event-location-tag'>Location: {getLocationName(event.location_id)}</p>
                        </div>
                    ) : <h2>No events match the selected criteria.</h2>
                }
            </main>
        </div>
    )
}

export default Events