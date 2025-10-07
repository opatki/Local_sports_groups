// server/config/reset.js

import { pool } from './database.js'
import dotenv from 'dotenv' // <-- ADD THIS LINE

dotenv.config() // <-- ADD THIS LINE

const dropTables = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;
`;

const createLocationsTable = `
    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zip VARCHAR(10) NOT NULL,
        image VARCHAR(255)
    );
`

const createEventsTable = `
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        time TIME,
        image VARCHAR(255),
        location_id INTEGER REFERENCES locations(id)
    );
`

const insertLocations = `
    INSERT INTO locations (name, address, city, state, zip, image) VALUES
    ('Echo Lounge', '123 Main St', 'UnityGrid City', 'UC', '10001', 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80'),
    ('House of Blues', '456 Tech Ave', 'UnityGrid City', 'UC', '10002', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/bb/36/fa/house-of-blues.jpg?w=1200&h=-1&s=1'),
    ('Pavilion', '789 Central Blvd', 'UnityGrid City', 'UC', '10003', 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=800&q=80'),
    ('American Airlines Center', '101 Data Dr', 'UnityGrid City', 'UC', '10004', 'https://www.hksinc.com/wp-content/uploads/2018/10/american_airlines_center_B-1.jpg')
    ON CONFLICT (name) DO NOTHING;
`;

const insertEvents = `
    INSERT INTO events (title, description, date, time, image, location_id) VALUES
    ('Synthwave Concert', 'A night of 80s inspired electronic music.', '2025-12-15', '20:00:00', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80', 1),
    ('AR Gaming Tournament', 'Compete in the city-wide AR gaming championship.', '2025-10-10', '18:30:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2eoK2vG3oPeW9QE7sq2LA167nCOGSKroM7g&s', 2),
    ('Future Tech Symposium', 'Keynote speakers on the next decade of cybernetics.', '2025-10-01', '09:00:00', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', 3),
    ('UnityGrid Marathon Finish Line Party', 'Celebrate the marathon runners at the center.', '2025-11-20', '14:00:00', 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80', 4),
    ('Past Event: City Planning Debate', 'A look back at the origins of UnityGrid.', '2024-05-20', '19:00:00', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', 1),
    ('Another Event at Echo Lounge', 'Second event for location 1.', '2025-11-05', '19:30:00', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', 1)
    ON CONFLICT DO NOTHING;
`;


async function resetDB() {
    try {
        await pool.query(dropTables);
        await pool.query(createLocationsTable)
        await pool.query(createEventsTable)
        await pool.query(insertLocations)
        await pool.query(insertEvents)
        console.log('Database reset complete.')
    } catch (error) {
        console.error('Error resetting database:', error)
    } finally {
        pool.end()
    }
}

resetDB()