import { Pool } from 'pg'

// PostgreSQL Connection Pool
// Verwende Umgebungsvariablen für Datenbankverbindung
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

export default pool


