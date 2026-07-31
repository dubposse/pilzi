import { notFound } from 'next/navigation'
import pool from '@/lib/db'
import Footer from '../../Footer'

// Metadata dynamisch generieren
export async function generateMetadata({ params }) {
  const { slug } = await params
  
  try {
    const result = await pool.query(
      'SELECT haendlername, ort, beschreibung FROM merchants WHERE slug = $1',
      [slug]
    )

    if (result.rows.length === 0) {
      return {
        title: 'Händler nicht gefunden - Pilzi'
      }
    }

    const haendler = result.rows[0]
    return {
      title: `${haendler.haendlername} – Pilzi Händler`,
      description: haendler.beschreibung || `${haendler.haendlername} aus ${haendler.ort} – Regionale Lebensmittel direkt vom Händler.`,
    }
  } catch (error) {
    console.error('Fehler beim Laden der Metadata:', error)
    return {
      title: 'Händler - Pilzi'
    }
  }
}

export default async function HaendlerPage({ params }) {
  const { slug } = await params

  let haendler = null

  try {
    const result = await pool.query(
      `SELECT 
        haendlername, strasse, plz, ort, telefon, 
        oeffnungszeiten, beschreibung, website, 
        created_at, updated_at
      FROM merchants 
      WHERE slug = $1`,
      [slug]
    )

    if (result.rows.length === 0) {
      notFound()
    }

    haendler = result.rows[0]
  } catch (error) {
    console.error('Fehler beim Laden des Händlers:', error)
    notFound()
  }

  // Datum formatieren
  const formatDate = (dateString) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <>
      <main className="page">
        <div style={{
          minHeight: '100vh',
          padding: '2rem 1rem',
          background: 'linear-gradient(135deg, #fef8f9 0%, #fff5f6 100%)'
        }}>
          <div style={{
            maxWidth: 800,
            margin: '0 auto'
          }}>
            {/* Header */}
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
                {haendler.haendlername}
              </h1>
              <p style={{
                fontSize: '1.1rem',
                color: '#666',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                {haendler.ort} · {haendler.plz}
              </p>
            </div>

            {/* Beschreibung */}
            {haendler.beschreibung && (
              <div style={{
                background: '#fff',
                border: '1.5px solid #ffd5db',
                borderRadius: 14,
                boxShadow: '0 2px 12px rgba(228,0,27,0.07)',
                padding: '1.8rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#b10016',
                  marginBottom: '1rem',
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  Über uns
                </h2>
                <p style={{
                  fontSize: '1.05rem',
                  color: '#333',
                  lineHeight: 1.6,
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  {haendler.beschreibung}
                </p>
              </div>
            )}

            {/* Kontakt & Infos */}
            <div style={{
              background: '#fff',
              border: '1.5px solid #ffd5db',
              borderRadius: 14,
              boxShadow: '0 2px 12px rgba(228,0,27,0.07)',
              padding: '1.8rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#b10016',
                marginBottom: '1rem',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                Kontakt & Standort
              </h2>

              <div style={{
                display: 'grid',
                gap: '1rem',
                fontSize: '1rem',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                {/* Adresse */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.3rem' }}>📍</span>
                  <div>
                    <strong style={{ color: '#b10016', display: 'block', marginBottom: '0.2rem' }}>
                      Adresse
                    </strong>
                    <span style={{ color: '#333' }}>
                      {haendler.strasse}<br />
                      {haendler.plz} {haendler.ort}
                    </span>
                  </div>
                </div>

                {/* Telefon */}
                {haendler.telefon && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}>
                    <span style={{ fontSize: '1.3rem' }}>📞</span>
                    <div>
                      <strong style={{ color: '#b10016', display: 'block', marginBottom: '0.2rem' }}>
                        Telefon
                      </strong>
                      <a 
                        href={`tel:${haendler.telefon.replace(/\s/g, '')}`}
                        style={{ 
                          color: '#333',
                          textDecoration: 'none'
                        }}
                      >
                        {haendler.telefon}
                      </a>
                    </div>
                  </div>
                )}

                {/* Öffnungszeiten */}
                {haendler.oeffnungszeiten && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}>
                    <span style={{ fontSize: '1.3rem' }}>🕐</span>
                    <div>
                      <strong style={{ color: '#b10016', display: 'block', marginBottom: '0.2rem' }}>
                        Öffnungszeiten
                      </strong>
                      <span style={{ 
                        color: '#333',
                        whiteSpace: 'pre-line'
                      }}>
                        {haendler.oeffnungszeiten}
                      </span>
                    </div>
                  </div>
                )}

                {/* Website */}
                {haendler.website && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}>
                    <span style={{ fontSize: '1.3rem' }}>🌐</span>
                    <div>
                      <strong style={{ color: '#b10016', display: 'block', marginBottom: '0.2rem' }}>
                        Website
                      </strong>
                      <a 
                        href={haendler.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          color: '#0066cc',
                          textDecoration: 'none',
                          wordBreak: 'break-all'
                        }}
                      >
                        {haendler.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Info */}
            <div style={{
              background: '#f8f8f8',
              border: '1px solid #e0e0e0',
              borderRadius: 12,
              padding: '1rem',
              fontSize: '0.9rem',
              color: '#888',
              textAlign: 'center',
              fontFamily: 'Segoe UI, system-ui, sans-serif',
              marginBottom: '1.5rem'
            }}>
              Profil erstellt am {formatDate(haendler.created_at)}
              {haendler.updated_at && haendler.updated_at !== haendler.created_at && (
                <> · Zuletzt aktualisiert am {formatDate(haendler.updated_at)}</>
              )}
            </div>

            {/* Zurück-Button */}
            <div style={{ textAlign: 'center' }}>
              <a
                href="/"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(90deg, #e4001b 60%, #cc001a 100%)',
                  color: '#fff',
                  borderRadius: 999,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontFamily: 'Segoe UI, system-ui, sans-serif',
                  boxShadow: '0 2px 16px rgba(228,0,27,0.10)'
                }}
              >
                ← Zurück zur Startseite
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
