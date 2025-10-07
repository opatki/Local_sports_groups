// client/src/pages/LocationEvents.jsx (MODIFIED)

import React, { useState, useEffect } from 'react'
import LocationAPI from '../services/LocationsAPI' 
import EventsAPI from '../services/EventsAPI' 
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState({}) 
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                // Fetch Location details using the index (which corresponds to ID)
                const locationData = await LocationAPI.getLocationById(index)
                setLocation(locationData)
                
                // Fetch Events for that location
                const eventsData = await EventsAPI.getEventsByLocationId(index)
                setEvents(eventsData)

            }
            catch (error) {
                console.error("Error fetching location/events:", error)
            }
        }) ()
    }, [index]) 

    // Helper to format address for the location header
    const formatAddress = () => {
        if (!location.address) return '';
        return `${location.address}, ${location.city}, ${location.state} ${location.zip}`
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    {/* Use location.image from the database */}
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name || 'Loading Location...'}</h2>
                    <p>{formatAddress()}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            // Pass all event properties for display
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                            description={event.description} // Pass description for better display
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents