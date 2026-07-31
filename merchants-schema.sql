-- PostgreSQL Tabellendefinition für Händler
-- Diese Tabelle musst du in deiner Datenbank erstellen

CREATE TABLE merchants (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  haendlername VARCHAR(255) NOT NULL,
  strasse VARCHAR(255) NOT NULL,
  plz VARCHAR(5) NOT NULL,
  ort VARCHAR(100) NOT NULL,
  telefon VARCHAR(50),
  oeffnungszeiten TEXT,
  beschreibung VARCHAR(300),
  website VARCHAR(500),
  edit_token_hash VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index für schnellere Slug-Suchen
CREATE INDEX idx_merchants_slug ON merchants(slug);

-- Beispiel für Trigger zum automatischen Aktualisieren von updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_merchants_updated_at 
  BEFORE UPDATE ON merchants 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
