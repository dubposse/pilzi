import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import crypto from 'crypto'

// Hilfsfunktion: Basis-Slug aus Name generieren
function generateBaseSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Akzente entfernen
    .replace(/[^a-z0-9]+/g, '-')     // Nicht-alphanumerische Zeichen → Bindestriche
    .replace(/^-+|-+$/g, '')         // Bindestriche am Anfang/Ende entfernen
    .slice(0, 50)                     // Max. 50 Zeichen
}

// Hilfsfunktion: Eindeutigen Slug finden
async function findUniqueSlug(name) {
  const baseSlug = generateBaseSlug(name)
  
  // Zuerst ohne Nummer versuchen
  const checkQuery = 'SELECT slug FROM merchants WHERE slug = $1'
  let result = await pool.query(checkQuery, [baseSlug])
  
  if (result.rows.length === 0) {
    return baseSlug // Basis-Slug ist frei
  }
  
  // Falls bereits vergeben, mit -2, -3, -4 etc. versuchen
  let counter = 2
  let candidateSlug = `${baseSlug}-${counter}`
  
  while (counter < 1000) { // Sicherheitslimit
    result = await pool.query(checkQuery, [candidateSlug])
    
    if (result.rows.length === 0) {
      return candidateSlug // Freier Slug gefunden
    }
    
    counter++
    candidateSlug = `${baseSlug}-${counter}`
  }
  
  // Fallback: Wenn zu viele Duplikate, Zufallszahl anhängen
  const randomSuffix = Math.floor(100000 + Math.random() * 900000)
  return `${baseSlug}-${randomSuffix}`
}

// Hilfsfunktion: Token generieren und hashen
function generateEditToken() {
  const token = crypto.randomBytes(32).toString('hex') // 64 Zeichen
  const hash = crypto.createHash('sha256').update(token).digest('hex')
  return { token, hash }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validierung der Pflichtfelder
    const { haendlername, strasse, plz, ort } = body
    if (!haendlername || !strasse || !plz || !ort) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen: Händlername, Straße, PLZ und Ort sind erforderlich.' },
        { status: 400 }
      )
    }

    // PLZ-Format prüfen (5 Ziffern)
    if (!/^\d{5}$/.test(plz)) {
      return NextResponse.json(
        { error: 'PLZ muss aus 5 Ziffern bestehen.' },
        { status: 400 }
      )
    }

    // Optionale Felder
    const telefon = body.telefon || null
    const oeffnungszeiten = body.oeffnungszeiten || null
    const beschreibung = body.beschreibung ? body.beschreibung.slice(0, 300) : null
    const website = body.website || null

    // Eindeutigen Slug und Token generieren
    const slug = await findUniqueSlug(haendlername)
    const { token, hash } = generateEditToken()

    // In Datenbank speichern
    const query = `
      INSERT INTO merchants (
        slug, haendlername, strasse, plz, ort, telefon, 
        oeffnungszeiten, beschreibung, website, edit_token_hash
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING slug, created_at
    `

    const values = [
      slug,
      haendlername,
      strasse,
      plz,
      ort,
      telefon,
      oeffnungszeiten,
      beschreibung,
      website,
      hash
    ]

    const result = await pool.query(query, values)

    // Erfolg: Slug und Token zurückgeben
    return NextResponse.json({
      success: true,
      slug: result.rows[0].slug,
      editToken: token, // Klartext-Token nur einmal anzeigen!
      createdAt: result.rows[0].created_at
    }, { status: 201 })

  } catch (error) {
    console.error('Fehler beim Erstellen des Händlers:', error)
    
    // Spezifische Fehlerbehandlung für DB-Constraints
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json(
        { error: 'Dieser Händler existiert bereits.' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Interner Serverfehler beim Erstellen des Händlers.' },
      { status: 500 }
    )
  }
}
