import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Impressum - Pilzi',
  description: 'Impressum und Kontaktinformationen'
}

export default function ImpressumPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2em 1em',
      background: 'linear-gradient(135deg, #fef8f9 0%, #fff5f6 100%)'
    }}>
      <div style={{
        background: '#fff5f6',
        border: '1.5px solid #ffd5db',
        borderRadius: 18,
        boxShadow: '0 4px 32px rgba(228,0,27,0.13)',
        padding: '2.2em 2.5em',
        maxWidth: 420,
        width: '90vw',
        color: '#b10016',
        fontFamily: 'Segoe UI, system-ui, sans-serif',
        fontSize: '1.13rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <strong style={{fontSize: '1.18em'}}>Impressum</strong><br/><br/>
        Matthias Brehm<br/>
        Nordwestring 89<br/>
        90419 Nürnberg<br/>
        <a href="mailto:matthiasbrehm1@gmx.de" style={{color: '#b10016', textDecoration: 'underline'}}>matthiasbrehm1@gmx.de</a>
        <br/><br/>
        <Link href="/" style={{
          display: 'inline-block',
          marginTop: '1em',
          padding: '0.5em 1.2em',
          background: '#b10016',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontSize: '0.95em',
          fontWeight: 500
        }}>
          ← Zurück zur App
        </Link>
      </div>
    </div>
  )
}
