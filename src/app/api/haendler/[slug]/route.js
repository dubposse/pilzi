import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import crypto from 'crypto'

// PATCH: Händler-Daten aktualisieren
export async function PATCH(request, { params }) {
  try {
    const { slug } = await params
    const body = await request.json()

    // Token-Validierung
    const { token, haendlername, strasse, plz, ort, telefon, oeffnungszeiten, beschreibung, website } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Bearbeitungstoken fehlt.' },
        { status: 401 }
      )
    }

    // Händler und Token-Hash aus DB laden
    const checkQuery = 'SELECT edit_token_hash FROM merchants WHERE slug = $1'
    const checkResult = await pool.query(checkQuery, [slug])

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Händler nicht gefunden.' },
        { status: 404 }
      )
    }

    // Token-Hash vergleichen
    const storedHash = checkResult.rows[0].edit_token_hash
    const providedHash = crypto.createHash('sha256').update(token).digest('hex')

    if (storedHash !== providedHash) {
      return NextResponse.json(
        { error: 'Ungültiger Bearbeitungstoken.' },
        { status: 403 }
      )
    }

    // Validierung der Pflichtfelder
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
    const finalTelefon = telefon || null
    const finalOeffnungszeiten = oeffnungszeiten || null
    const finalBeschreibung = beschreibung ? beschreibung.slice(0, 300) : null
    const finalWebsite = website || null

    // Daten aktualisieren (Slug bleibt unverändert)
    const updateQuery = `
      UPDATE merchants 
      SET 
        haendlername = $1,
        strasse = $2,
        plz = $3,
        ort = $4,
        telefon = $5,
        oeffnungszeiten = $6,
        beschreibung = $7,
        website = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE slug = $9
      RETURNING slug, updated_at
    `

    const values = [
      haendlername,
      strasse,
      plz,
      ort,
      finalTelefon,
      finalOeffnungszeiten,
      finalBeschreibung,
      finalWebsite,
      slug
    ]

    const result = await pool.query(updateQuery, values)

    return NextResponse.json({
      success: true,
      slug: result.rows[0].slug,
      updatedAt: result.rows[0].updated_at
    }, { status: 200 })

  } catch (error) {
    console.error('Fehler beim Aktualisieren des Händlers:', error)
    
    return NextResponse.json(
      { error: 'Interner Serverfehler beim Aktualisieren des Händlers.' },
      { status: 500 }
    )
  }
}
