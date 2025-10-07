// server/config/database.js

import pg from 'pg'
import dotenv from 'dotenv'
import path from 'path' // <-- Import 'path'
import { fileURLToPath } from 'url' // <-- Import 'fileURLToPath'


// --- Path Resolution for ES Modules ---
// 1. Get the current file's absolute path
const __filename = fileURLToPath(import.meta.url);
// 2. Get the directory of the current file (server/config)
const __dirname = path.dirname(__filename);
// 3. Resolve the path to the .env file (up two directories to project root, then into server/.env)
const envPath = path.resolve(__dirname, '..', '..', 'server', '.env'); 

dotenv.config({ path: envPath }); 

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}

console.log('Database configuration:', config)


export const pool = new pg.Pool(config)