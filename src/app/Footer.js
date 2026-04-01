import React from 'react'
import DatenschutzModal from './DatenschutzModal'

export default function Footer() {
  return (
    <footer className="footer-fixed">
      <div className="footer-row" style={{gap: 10, fontSize: '0.97em', padding: '0.2em 0'}}>
        <a
          className="footer-link"
          href="#"
          style={{fontSize: '0.97em', padding: '0.18em 0.7em'}}
          onClick={e => {
            e.preventDefault();
            const modal = document.getElementById('impressum-modal');
            if (modal) modal.style.display = 'flex';
          }}
        >Impressum</a>
        <a className="footer-link" href="https://github.com/dubposse/pilzi" target="_blank" rel="noopener noreferrer" style={{fontSize: '0.97em', padding: '0.18em 0.7em'}}>GitHub</a>
        <a className="footer-link" href="https://github.com/dubposse/pilzi?tab=AGPL-3.0-1-ov-file" target="" rel="noopener noreferrer" style={{fontSize: '0.97em', padding: '0.18em 0.7em'}}>Lizenz</a>
        <a
          className="footer-link"
          href="#"
          style={{fontSize: '0.97em', padding: '0.18em 0.7em'}}
          onClick={e => {
            e.preventDefault();
            const modal = document.getElementById('datenschutz-modal');
            if (modal) modal.style.display = 'flex';
          }}
        >Datenschutz</a>
      </div>
      <div id="impressum-modal" style={{
        display: 'none',
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.18)',
        zIndex: 3000,
        justifyContent: 'center',
        alignItems: 'center',
      }} onClick={e => {
        if (e.target.id === 'impressum-modal') e.currentTarget.style.display = 'none';
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
          position: 'relative',
          margin: '0 auto'
        }}>
          <strong style={{fontSize: '1.18em'}}>Impressum</strong><br/><br/>
          Matthias Brehm<br/>
          Nordwestring 89<br/>
          90419 Nürnberg<br/>
          <a href="mailto:matthiasbrehm1@gmx.de" style={{color: '#b10016', textDecoration: 'underline'}}>matthiasbrehm1@gmx.de</a>
          <button style={{position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: '1.5em', color: '#b10016', cursor: 'pointer'}} onClick={e => {
            e.preventDefault();
            document.getElementById('impressum-modal').style.display = 'none';
          }} aria-label="Schließen">×</button>
        </div>
      </div>
      <div id="datenschutz-modal" style={{
        display: 'none',
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.18)',
        zIndex: 3000,
        justifyContent: 'center',
        alignItems: 'center',
      }} onClick={e => {
        if (e.target.id === 'datenschutz-modal') e.currentTarget.style.display = 'none';
      }}>
        <DatenschutzModal />
      </div>
    </footer>
  )
}
