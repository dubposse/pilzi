import React from 'react'

export default function Footer() {
  return (
    <footer className="footer-fixed">
      <div className="footer-row" style={{gap: 10, fontSize: '0.97em', padding: '0.2em 0'}}>
        <a className="footer-link" href="/impressum" style={{fontSize: '0.97em', padding: '0.18em 0.7em'}}>Impressum</a>
        <a className="footer-link" href="https://github.com/dubposse/pilzi" target="_blank" rel="noopener noreferrer" style={{fontSize: '0.97em', padding: '0.18em 0.7em'}}>GitHub</a>
        <a className="footer-link" href="https://github.com/dubposse/pilzi?tab=AGPL-3.0-1-ov-file" target="_blank" rel="noopener noreferrer" style={{fontSize: '0.97em', padding: '0.18em 0.7em'}}>Lizenz</a>
        <a className="footer-link" href="/datenschutz" style={{fontSize: '0.97em', padding: '0.18em 0.7em'}}>Datenschutz</a>
      </div>
    </footer>
  )
}
