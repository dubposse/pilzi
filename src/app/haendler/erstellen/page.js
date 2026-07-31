'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '../../Footer'

export default function HaendlerErstellenPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    haendlername: '',
    strasse: '',
    plz: '',
    ort: '',
    telefon: '',
    oeffnungszeiten: '',
    beschreibung: '',
    website: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Fehler zurücksetzen bei Eingabe
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/haendler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Ein Fehler ist aufgetreten')
        setLoading(false)
        return
      }

      // Erfolg: Weiterleiten zur Erfolgsseite mit slug und token
      router.push(`/haendler/erfolg?slug=${data.slug}&token=${data.editToken}`)

    } catch (err) {
      console.error('Formular-Fehler:', err)
      setError('Verbindungsfehler. Bitte versuche es erneut.')
      setLoading(false)
    }
  }

  return (
    <>
      <main className="page">
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem 1rem',
          background: 'linear-gradient(135deg, #fef8f9 0%, #fff5f6 100%)'
        }}>
          <div style={{
            background: '#fff',
            border: '1.5px solid #ffd5db',
            borderRadius: 18,
            boxShadow: '0 4px 32px rgba(228,0,27,0.13)',
            padding: '2.5rem',
            maxWidth: 560,
            width: '100%'
          }}>
            <h1 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#b10016',
              marginBottom: '0.5rem',
              textAlign: 'center',
              fontFamily: 'Segoe UI, system-ui, sans-serif'
            }}>
              Händler-Profil erstellen
            </h1>
            
            <p style={{
              fontSize: '1rem',
              color: '#666',
              marginBottom: '2rem',
              textAlign: 'center',
              fontFamily: 'Segoe UI, system-ui, sans-serif'
            }}>
              Erstelle kostenlos deine öffentliche Profilseite
            </p>

            {error && (
              <div style={{
                background: '#ffe4e8',
                border: '1.5px solid #e4001b',
                borderRadius: 12,
                padding: '1rem',
                marginBottom: '1.5rem',
                color: '#b10016',
                fontSize: '0.95rem',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#b10016',
                  marginBottom: '0.4rem',
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  Händlername <span style={{ color: '#e4001b' }}>*</span>
                </label>
                <input
                  type="text"
                  name="haendlername"
                  value={formData.haendlername}
                  onChange={handleChange}
                  required
                  placeholder="z.B. Bio-Hofladen Müller"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '1.5px solid #ffd5db',
                    borderRadius: 12,
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                    outline: 'none',
                    transition: 'border 0.18s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#e4001b'}
                  onBlur={(e) => e.target.style.borderColor = '#ffd5db'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#b10016',
                  marginBottom: '0.4rem',
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  Straße und Hausnummer <span style={{ color: '#e4001b' }}>*</span>
                </label>
                <input
                  type="text"
                  name="strasse"
                  value={formData.strasse}
                  onChange={handleChange}
                  required
                  placeholder="z.B. Hauptstraße 42"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '1.5px solid #ffd5db',
                    borderRadius: 12,
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                    outline: 'none',
                    transition: 'border 0.18s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#e4001b'}
                  onBlur={(e) => e.target.style.borderColor = '#ffd5db'}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: '0 0 120px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#b10016',
                    marginBottom: '0.4rem',
                    fontFamily: 'Segoe UI, system-ui, sans-serif'
                  }}>
                    PLZ <span style={{ color: '#e4001b' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="plz"
                    value={formData.plz}
                    onChange={handleChange}
                    required
                    pattern="\d{5}"
                    maxLength="5"
                    placeholder="12345"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      border: '1.5px solid #ffd5db',
                      borderRadius: 12,
                      fontFamily: 'Segoe UI, system-ui, sans-serif',
                      outline: 'none',
                      transition: 'border 0.18s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#e4001b'}
                    onBlur={(e) => e.target.style.borderColor = '#ffd5db'}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#b10016',
                    marginBottom: '0.4rem',
                    fontFamily: 'Segoe UI, system-ui, sans-serif'
                  }}>
                    Ort <span style={{ color: '#e4001b' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="ort"
                    value={formData.ort}
                    onChange={handleChange}
                    required
                    placeholder="z.B. München"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      border: '1.5px solid #ffd5db',
                      borderRadius: 12,
                      fontFamily: 'Segoe UI, system-ui, sans-serif',
                      outline: 'none',
                      transition: 'border 0.18s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#e4001b'}
                    onBlur={(e) => e.target.style.borderColor = '#ffd5db'}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#b10016',
                  marginBottom: '0.4rem',
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  Telefon (optional)
                </label>
                <input
                  type="tel"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  placeholder="z.B. 0911 12345678"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '1.5px solid #ffd5db',
                    borderRadius: 12,
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                    outline: 'none',
                    transition: 'border 0.18s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#e4001b'}
                  onBlur={(e) => e.target.style.borderColor = '#ffd5db'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#b10016',
                  marginBottom: '0.4rem',
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  Öffnungszeiten (optional)
                </label>
                <textarea
                  name="oeffnungszeiten"
                  value={formData.oeffnungszeiten}
                  onChange={handleChange}
                  rows="3"
                  placeholder="z.B. Mo-Fr 9-18 Uhr, Sa 9-14 Uhr"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '1.5px solid #ffd5db',
                    borderRadius: 12,
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border 0.18s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#e4001b'}
                  onBlur={(e) => e.target.style.borderColor = '#ffd5db'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#b10016',
                  marginBottom: '0.4rem',
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  Kurzbeschreibung (optional, max. 300 Zeichen)
                </label>
                <textarea
                  name="beschreibung"
                  value={formData.beschreibung}
                  onChange={handleChange}
                  rows="4"
                  maxLength="300"
                  placeholder="Beschreibe kurz, was dein Geschäft besonders macht..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '1.5px solid #ffd5db',
                    borderRadius: 12,
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border 0.18s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#e4001b'}
                  onBlur={(e) => e.target.style.borderColor = '#ffd5db'}
                />
                <div style={{
                  fontSize: '0.85rem',
                  color: '#888',
                  marginTop: '0.3rem',
                  textAlign: 'right',
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  {formData.beschreibung.length}/300
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#b10016',
                  marginBottom: '0.4rem',
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  Website oder Instagram (optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '1.5px solid #ffd5db',
                    borderRadius: 12,
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                    outline: 'none',
                    transition: 'border 0.18s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#e4001b'}
                  onBlur={(e) => e.target.style.borderColor = '#ffd5db'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: loading 
                    ? 'linear-gradient(90deg, #888 60%, #777 100%)'
                    : 'linear-gradient(90deg, #e4001b 60%, #cc001a 100%)',
                  border: 'none',
                  borderRadius: 999,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Segoe UI, system-ui, sans-serif',
                  boxShadow: '0 2px 16px rgba(228,0,27,0.10)',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  opacity: loading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px) scale(1.02)'
                    e.target.style.boxShadow = '0 6px 24px rgba(228,0,27,0.16)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.boxShadow = '0 2px 16px rgba(228,0,27,0.10)'
                }}
              >
                {loading ? 'Wird erstellt...' : 'Profil erstellen'}
              </button>
            </form>

            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #ffd5db',
              textAlign: 'center'
            }}>
              <a
                href="/"
                style={{
                  color: '#b10016',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  fontFamily: 'Segoe UI, system-ui, sans-serif',
                  transition: 'opacity 0.18s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
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
