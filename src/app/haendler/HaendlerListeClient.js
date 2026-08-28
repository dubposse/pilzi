'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BUNDESLAENDER, getBundeslandFromPlz } from '@/lib/plzToBundesland'

export default function HaendlerListeClient({ haendlerListe }) {
  const [selectedBundesland, setSelectedBundesland] = useState(null)
  const [showBundeslandFilter, setShowBundeslandFilter] = useState(false)

  const listeMitBundesland = useMemo(
    () => haendlerListe.map((h) => ({ ...h, bundesland: getBundeslandFromPlz(h.plz) })),
    [haendlerListe]
  )

  const gefilterteListe = selectedBundesland
    ? listeMitBundesland.filter((h) => h.bundesland === selectedBundesland)
    : listeMitBundesland

  const cardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff',
    border: '1.5px solid #ffd5db',
    borderRadius: 14,
    boxShadow: '0 2px 12px rgba(228,0,27,0.07)',
    padding: '1.2rem 1.6rem',
    textDecoration: 'none',
    color: 'inherit'
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.7rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setShowBundeslandFilter((v) => !v)}
          style={{
            background: showBundeslandFilter ? '#b10016' : '#fff',
            color: showBundeslandFilter ? '#fff' : '#b10016',
            border: '1.5px solid #b10016',
            borderRadius: 999,
            padding: '0.55rem 1.3rem',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
          Nach Bundesland filtern
        </button>
        {selectedBundesland && (
          <button
            type="button"
            onClick={() => setSelectedBundesland(null)}
            style={{
              background: '#fff',
              color: '#666',
              border: '1.5px solid #ffd5db',
              borderRadius: 999,
              padding: '0.55rem 1.3rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            Filter zurücksetzen ({selectedBundesland})
          </button>
        )}
      </div>

      {showBundeslandFilter && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1.8rem'
        }}>
          {BUNDESLAENDER.map((land) => (
            <button
              key={land}
              type="button"
              onClick={() => {
                setSelectedBundesland(land)
                setShowBundeslandFilter(false)
              }}
              style={{
                background: selectedBundesland === land ? '#b10016' : '#fff5f6',
                color: selectedBundesland === land ? '#fff' : '#b10016',
                border: '1.5px solid #ffd5db',
                borderRadius: 999,
                padding: '0.45rem 1rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {land}
            </button>
          ))}
        </div>
      )}

      {gefilterteListe.length === 0 ? (
        <div style={{
          background: '#fff',
          border: '1.5px solid #ffd5db',
          borderRadius: 14,
          boxShadow: '0 2px 12px rgba(228,0,27,0.07)',
          padding: '1.8rem',
          textAlign: 'center',
          color: '#666'
        }}>
          {selectedBundesland
            ? `Keine Händler in ${selectedBundesland} gefunden.`
            : 'Es sind noch keine Händler registriert.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {gefilterteListe.map((haendler) => (
            <Link key={haendler.slug} href={`/haendler/${haendler.slug}`} style={cardStyle}>
              <div>
                <div style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#b10016',
                  fontFamily: 'Segoe UI, system-ui, sans-serif'
                }}>
                  {haendler.haendlername}
                </div>
                <div style={{ fontSize: '0.95rem', color: '#666' }}>
                  {haendler.ort} · {haendler.plz}
                  {haendler.bundesland ? ` · ${haendler.bundesland}` : ''}
                </div>
              </div>
              <span style={{ color: '#b10016', fontSize: '1.3rem' }}>→</span>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
