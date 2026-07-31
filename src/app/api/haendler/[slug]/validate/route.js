import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import crypto from 'crypto'

// POST: Token validieren und Händler-Daten laden
export async function POST(request, { params }) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Bearbeitungstoken fehlt.' },
        { status: 401 }
      )
    }

    // Händler-Daten und Token-Hash aus DB laden
    const query = `
      SELECT 
        haendlername, strasse, plz, ort, telefon, 
        oeffnungszeiten, beschreibung, website, edit_token_hash
      FROM merchants 
      WHERE slug = $1
    `
    const result = await pool.query(query, [slug])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Händler nicht gefunden.' },
        { status: 404 }
      )
    }

    const haendler = result.rows[0]

    // Token-Hash vergleichen
    const storedHash = haendler.edit_token_hash
    const providedHash = crypto.createHash('sha256').update(token).digest('hex')

    if (storedHash !== providedHash) {
      return NextResponse.json(
        { error: 'Ungültiger Bearbeitungstoken. Bitte verwende den vollständigen Bearbeitungslink.' },
        { status: 403 }
      )
    }

    // Token ist gültig, Händler-Daten zurückgeben (ohne edit_token_hash)
    const { edit_token_hash, ...haendlerData } = haendler

    return NextResponse.json({
      success: true,
      ...haendlerData
    }, { status: 200 })

  } catch (error) {
    console.error('Fehler bei der Token-Validierung:', error)
    
    return NextResponse.json(
      { error: 'Interner Serverfehler bei der Validierung.' },
      { status: 500 }
    )
  }
}
