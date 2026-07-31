'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Footer from '../../Footer'

export default function ErfolgPage() {
  const searchParams = useSearchParams()
  const [slug, setSlug] = useState('')
  const [token, setToken] = useState('')
  const [copied, setCopied] = useState('')

  useEffect(() => {
    setSlug(searchParams.get('slug') || '')
    setToken(searchParams.get('token') || '')
  }, [searchParams])

  const publicUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/haendler/${slug}`
    : ''

  const editUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/haendler/${slug}/bearbeiten?token=${token}`
    : ''

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      console.error('Kopieren fehlgeschlagen:', err)
    }
  }

  if (!slug || !token) {
    return (
      <>
        <main className="page">
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem 1rem',
            background: 'linear-gradient(135deg, #fef8f9 0%, #fff5f6 100%)'
          }}>
            <div style={{
              background: '#ffe4e8',
              border: '1.5px solid #e4001b',
              borderRadius: 18,
              padding: '2rem',
              maxWidth: 420,
              textAlign: 'center',
              color: '#b10016',
              fontFamily: 'Segoe UI, system-ui, sans-serif'
            }}>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Keine Daten gefunden
              </h1>
              <p style={{ marginBottom: '1.5rem' }}>
                Bitte erstelle zuerst ein Händler-Profil.
              </p>
              <a
                href="/haendler/erstellen"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(90deg, #e4001b 60%, #cc001a 100%)',
                  color: '#fff',
                  borderRadius: 999,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1rem'
                }}
              >
                Profil erstellen
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="page">
        <div style={{
          minHeight: '100vh',
          display: 'flex',
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
            maxWidth: 600,
            width: '100%'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                🎉
              </div>
              <h1 style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#b10016',
                marginBottom: '0.5rem',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                Profil erfolgreich erstellt!
              </h1>
              <p style={{
                fontSize: '1rem',
                color: '#666',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                Dein Händler-Profil ist jetzt online
              </p>
            </div>

            {/* Öffentlicher Link */}
            <div style={{
              background: '#f8feff',
              border: '1.5px solid #d5f4ff',
              borderRadius: 12,
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#0066cc',
                marginBottom: '0.75rem',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                📍 Öffentliches Profil
              </h2>
              <p style={{
                fontSize: '0.9rem',
                color: '#666',
                marginBottom: '0.75rem',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                Diese Seite kann jeder sehen und aufrufen:
              </p>
              <div style={{
                background: '#fff',
                border: '1px solid #d5f4ff',
                borderRadius: 8,
                padding: '0.75rem',
                fontSize: '0.9rem',
                color: '#333',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                marginBottom: '0.75rem'
              }}>
                {publicUrl}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => copyToClipboard(publicUrl, 'public')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    background: copied === 'public' ? '#4CAF50' : '#0066cc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                    transition: 'background 0.18s'
                  }}
                >
                  {copied === 'public' ? '✓ Kopiert!' : 'Link kopieren'}
                </button>
                <a
                  href={publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    background: '#fff',
                    color: '#0066cc',
                    border: '1.5px solid #0066cc',
                    borderRadius: 8,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                    transition: 'background 0.18s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f0f8ff'}
                  onMouseLeave={(e) => e.target.style.background = '#fff'}
                >
                  Profil ansehen
                </a>
              </div>
            </div>

            {/* Bearbeitungslink */}
            <div style={{
              background: '#fff8f5',
              border: '1.5px solid #ffd5db',
              borderRadius: 12,
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#e4001b',
                marginBottom: '0.75rem',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                🔐 Bearbeitungslink
              </h2>
              <p style={{
                fontSize: '0.9rem',
                color: '#666',
                marginBottom: '0.75rem',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                <strong style={{ color: '#e4001b' }}>Wichtig:</strong> Mit diesem Link kannst du später dein Profil bearbeiten. Speichere ihn gut ab!
              </p>
              <div style={{
                background: '#fff',
                border: '1px solid #ffd5db',
                borderRadius: 8,
                padding: '0.75rem',
                fontSize: '0.85rem',
                color: '#333',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                marginBottom: '0.75rem',
                maxHeight: '80px',
                overflowY: 'auto'
              }}>
                {editUrl}
              </div>
              <button
                onClick={() => copyToClipboard(editUrl, 'edit')}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  background: copied === 'edit' ? '#4CAF50' : 'linear-gradient(90deg, #e4001b 60%, #cc001a 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Segoe UI, system-ui, sans-serif',
                  transition: 'background 0.18s'
                }}
              >
                {copied === 'edit' ? '✓ Bearbeitungslink kopiert!' : 'Bearbeitungslink kopieren'}
              </button>
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: '#fff5f6',
                border: '1px solid #ffd5db',
                borderRadius: 8,
                fontSize: '0.85rem',
                color: '#b10016',
                fontFamily: 'Segoe UI, system-ui, sans-serif'
              }}>
                ⚠️ Dieser Link wird nur <strong>einmal</strong> angezeigt. Wenn du ihn verlierst, musst du ein neues Profil erstellen.
              </div>
            </div>

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
                  boxShadow: '0 2px 16px rgba(228,0,27,0.10)',
                  transition: 'transform 0.18s, box-shadow 0.18s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px) scale(1.02)'
                  e.target.style.boxShadow = '0 6px 24px rgba(228,0,27,0.16)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.boxShadow = '0 2px 16px rgba(228,0,27,0.10)'
                }}
              >
                Zurück zur Startseite
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
