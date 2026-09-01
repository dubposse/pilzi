'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function DatenschutzPage() {
  const [lang, setLang] = useState('de')
  
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
        maxWidth: 520,
        width: '96vw',
        color: '#b10016',
        fontFamily: 'Segoe UI, system-ui, sans-serif',
        fontSize: '1.07rem',
        textAlign: 'left',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 8}}>
          <button onClick={() => setLang('de')} style={{fontWeight: lang==='de'?'bold':'normal', background: 'none', border: 'none', color: '#b10016', cursor: 'pointer', fontSize: '1.07rem', textDecoration: lang==='de'?'underline':'none'}}>Deutsch</button>
          <span style={{color: '#b10016', opacity: 0.5}}>|</span>
          <button onClick={() => setLang('en')} style={{fontWeight: lang==='en'?'bold':'normal', background: 'none', border: 'none', color: '#b10016', cursor: 'pointer', fontSize: '1.07rem', textDecoration: lang==='en'?'underline':'none'}}>English</button>
        </div>
        {lang === 'de' ? (
          <>
            <strong style={{fontSize: '1.18em', display: 'block', textAlign: 'center'}}>Datenschutzerklärung</strong>
            <br/>
            <ol style={{paddingLeft: 18}}>
              <li style={{marginBottom: 10}}>
                <strong>Datenschutz auf einen Blick</strong><br/>
                Der Schutz Ihrer Daten ist mir wichtig. Diese Erklärung informiert Sie darüber, welche Daten erhoben werden, wenn Sie diese Website nutzen.<br/>
                Diese Web-App dient ausschließlich der Anzeige saisonaler Lebensmittel und verarbeitet keine aktiv vom Nutzer eingegebenen personenbezogenen Daten (z. B. durch Formulare oder Login-Funktionen).
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Verantwortliche Stelle</strong><br/>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br/>
                Matthias Brehm<br/>
                Nordwestring 89<br/>
                90419 Nürnberg<br/>
                E-Mail: kontakt@matthiasbrehm.de
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Datenerfassung beim Aufruf der Website</strong><br/>
                Beim Aufruf dieser Website werden automatisch technische Daten durch den Hosting-Anbieter erfasst. Dazu gehören insbesondere:<br/>
                <ul style={{margin: '6px 0 6px 18px'}}>
                  <li>IP-Adresse</li>
                  <li>Datum und Uhrzeit der Anfrage</li>
                  <li>Browsertyp und Version</li>
                  <li>Betriebssystem</li>
                  <li>Referrer URL</li>
                </ul>
                Diese Daten werden in sogenannten Server-Logfiles gespeichert.<br/>
                <br/>
                <strong>Zweck der Verarbeitung:</strong><br/>
                Die Verarbeitung erfolgt zur Gewährleistung eines sicheren und stabilen Betriebs der Website.<br/>
                <strong>Rechtsgrundlage:</strong><br/>
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und funktionsfähigen Webangebot)
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Hosting durch Vercel</strong><br/>
                Diese Website wird bei der Vercel Inc. gehostet<br/>
                (340 S Lemon Ave #4133, Walnut, CA 91789, USA).<br/>
                <br/>
                Vercel verarbeitet automatisch Zugriffsdaten (siehe oben), um die Bereitstellung und Sicherheit der Website zu gewährleisten.<br/>
                Es wurde ein Vertrag zur Auftragsverarbeitung (DPA) geschlossen<br/>
                Die Datenübertragung in die USA erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission<br/>
                <br/>
                Weitere Informationen:<br/>
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{color: '#b10016', textDecoration: 'underline'}}>https://vercel.com/legal/privacy-policy</a>
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Cookies und Tracking</strong><br/>
                Diese Website verwendet keine Cookies, die einer Einwilligung bedürfen, und setzt keine Tracking- oder Analyse-Tools ein.
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Händlerseiten</strong><br/>
                Händler haben die Möglichkeit, freiwillig eine öffentliche Profilseite zu erstellen. Dabei geben sie selbst folgende Daten ein:<br/>
                <ul style={{margin: '6px 0 6px 18px'}}>
                  <li>Händlername</li>
                  <li>Adresse (Straße, PLZ, Ort)</li>
                  <li>Optional: Telefon, Öffnungszeiten, Kurzbeschreibung, Website</li>
                </ul>
                <br/>
                <strong>Speicherung und Verwendung:</strong><br/>
                Die eingegebenen Daten werden in einer PostgreSQL-Datenbank gespeichert und ausschließlich zur Bereitstellung der öffentlichen Händlerseite verwendet. Die Händlerseite ist öffentlich im Internet erreichbar und kann von jedem Nutzer aufgerufen werden.<br/>
                <br/>
                <strong>Bearbeitungslink:</strong><br/>
                Zum Bearbeiten der Händler-Daten wird ein individueller, geheimer Bearbeitungslink verwendet. Dieser Link sollte vertraulich behandelt werden. Jeder, der über diesen Link verfügt, kann die veröffentlichten Daten ändern.<br/>
                <br/>
                <strong>Änderung und Löschung:</strong><br/>
                Händler können ihre Daten jederzeit über den Bearbeitungslink ändern. Für die Löschung der Händlerseite wenden Sie sich bitte an die oben angegebene verantwortliche Stelle.<br/>
                <br/>
                <strong>Rechtsgrundlage:</strong><br/>
                Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch freiwillige Eingabe)
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Ihre Rechte</strong><br/>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:<br/>
                <ul style={{margin: '6px 0 6px 18px'}}>
                  <li>Auskunft über Ihre gespeicherten Daten</li>
                  <li>Berichtigung unrichtiger Daten</li>
                  <li>Löschung Ihrer Daten</li>
                  <li>Einschränkung der Verarbeitung</li>
                  <li>Widerspruch gegen die Verarbeitung</li>
                  <li>Datenübertragbarkeit</li>
                </ul>
                Zur Ausübung Ihrer Rechte können Sie sich jederzeit an die oben angegebene verantwortliche Stelle wenden.
              </li>
            </ol>
          </>
        ) : (
          <>
            <strong style={{fontSize: '1.18em', display: 'block', textAlign: 'center'}}>Privacy Policy</strong>
            <br/>
            <ol style={{paddingLeft: 18}}>
              <li style={{marginBottom: 10}}>
                <strong>Privacy at a Glance</strong><br/>
                Protecting your data is important to me. This statement informs you about what data is collected when you use this website.<br/>
                This web app is solely for displaying seasonal foods and does not process any personal data actively entered by users (e.g., via forms or login functions).
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Responsible Entity</strong><br/>
                The person responsible for data processing on this website is:<br/>
                Matthias Brehm<br/>
                Nordwestring 89<br/>
                90419 Nürnberg<br/>
                E-Mail: kontakt@matthiasbrehm.de
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Data Collection When Visiting the Website</strong><br/>
                When you visit this website, technical data is automatically collected by the hosting provider. This includes in particular:<br/>
                <ul style={{margin: '6px 0 6px 18px'}}>
                  <li>IP address</li>
                  <li>Date and time of the request</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referrer URL</li>
                </ul>
                This data is stored in so-called server log files.<br/>
                <br/>
                <strong>Purpose of Processing:</strong><br/>
                The processing is carried out to ensure the secure and stable operation of the website.<br/>
                <strong>Legal Basis:</strong><br/>
                Art. 6(1)(f) GDPR (legitimate interest in a secure and functional web offering)
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Hosting by Vercel</strong><br/>
                This website is hosted by Vercel Inc.<br/>
                (340 S Lemon Ave #4133, Walnut, CA 91789, USA).<br/>
                <br/>
                Vercel automatically processes access data (see above) to ensure the provision and security of the website.<br/>
                A data processing agreement (DPA) has been concluded.<br/>
                Data transfer to the USA is based on the EU Commission's standard contractual clauses.<br/>
                <br/>
                More information:<br/>
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{color: '#b10016', textDecoration: 'underline'}}>https://vercel.com/legal/privacy-policy</a>
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Cookies and Tracking</strong><br/>
                This website does not use cookies that require consent and does not use any tracking or analytics tools.
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Merchant Pages</strong><br/>
                Merchants have the option to voluntarily create a public profile page. In doing so, they enter the following data themselves:<br/>
                <ul style={{margin: '6px 0 6px 18px'}}>
                  <li>Merchant name</li>
                  <li>Address (street, postal code, city)</li>
                  <li>Optional: phone, opening hours, brief description, website</li>
                </ul>
                <br/>
                <strong>Storage and Use:</strong><br/>
                The entered data is stored in a PostgreSQL database and is used exclusively to provide the public merchant page. The merchant page is publicly accessible on the internet and can be accessed by any user.<br/>
                <br/>
                <strong>Edit Link:</strong><br/>
                An individual, secret edit link is used to edit merchant data. This link should be treated confidentially. Anyone who has access to this link can modify the published data.<br/>
                <br/>
                <strong>Modification and Deletion:</strong><br/>
                Merchants can modify their data at any time via the edit link. To delete the merchant page, please contact the responsible entity listed above.<br/>
                <br/>
                <strong>Legal Basis:</strong><br/>
                Art. 6(1)(a) GDPR (consent through voluntary entry)
              </li>
              <li style={{marginBottom: 10}}>
                <strong>Your Rights</strong><br/>
                Under applicable law, you have the right at any time to:<br/>
                <ul style={{margin: '6px 0 6px 18px'}}>
                  <li>Information about your stored data</li>
                  <li>Correction of incorrect data</li>
                  <li>Deletion of your data</li>
                  <li>Restriction of processing</li>
                  <li>Objection to processing</li>
                  <li>Data portability</li>
                </ul>
                To exercise your rights, you can contact the responsible entity named above at any time.
              </li>
            </ol>
          </>
        )}
        <div style={{textAlign: 'center', marginTop: '1.5em'}}>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '0.5em 1.2em',
            background: '#b10016',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: '0.95em',
            fontWeight: 500
          }}>
            ← {lang === 'de' ? 'Zurück zur App' : 'Back to App'}
          </Link>
        </div>
      </div>
    </div>
  )
}
