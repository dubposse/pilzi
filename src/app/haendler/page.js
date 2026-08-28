import pool from '@/lib/db'
import Footer from '../Footer'
import HaendlerListeClient from './HaendlerListeClient'

export const metadata = {
  title: 'Alle Händler – Pilzi',
  description: 'Übersicht aller registrierten Händler bei Pilzi.'
}

export const dynamic = 'force-dynamic'

export default async function HaendlerListePage() {
  let haendlerListe = []

  try {
    const result = await pool.query(
      `SELECT slug, haendlername, ort, plz
       FROM merchants
       ORDER BY haendlername ASC`
    )
    haendlerListe = result.rows
  } catch (error) {
    console.error('Fehler beim Laden der Händlerliste:', error)
  }

  return (
    <>
      <main className="page">
        <div style={{
          minHeight: '100vh',
          padding: '2rem 1rem',
          background: 'linear-gradient(135deg, #fef8f9 0%, #fff5f6 100%)'
        }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fff5f6 0%, #ffffff 100%)',
              border: '1.5px solid #ffd5db',
              borderRadius: 18,
              boxShadow: '0 4px 32px rgba(228,0,27,0.13)',
              padding: '2.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: '2.2rem',
                fontWeight: 700,
                color: '#b10016',
                marginBottom: '0.5rem',
                fontFamily: 'Segoe UI, system-ui, sans-serif',
                lineHeight: 1.2
              }}>
                Alle Händler
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#666', fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
                Wähle einen Händler aus, um sein Profil zu sehen.
              </p>
            </div>

            <HaendlerListeClient haendlerListe={haendlerListe} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
