'use client'

import { useMemo, useState, useRef } from 'react'
import { foods } from '../data/foods'

const monthNames = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
]

const categories = ['Alle', 'Obst', 'Gemüse', 'Fisch', 'Beilage', 'Alternative', 'Molkereiprodukt', 'Fleisch']

export default function Page() {
  const [showMainContent, setShowMainContent] = useState(false)
  const [fadeImage, setFadeImage] = useState(false)
  const imageRef = useRef(null)
    // Scrollt zur Food-Card mit passender ID
    const scrollToFood = (id) => {
      const element = document.getElementById(`food-${id}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  const currentMonthIndex = new Date().getMonth()
  const [search, setSearch] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(monthNames[currentMonthIndex])
  const [selectedCategory, setSelectedCategory] = useState('Alle')

  const filteredFoods = useMemo(() => {
  return foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase())
      

    const seasonText = (food.saison || '').toLowerCase()
    const matchesMonth =
      selectedMonth === 'Alle Monate' ||
      seasonText.includes(selectedMonth.toLowerCase()) ||
      seasonText.includes('ganzjährig')

    const categoryText = (food.kategorie || '').toLowerCase()
    const matchesCategory =
      selectedCategory === 'Alle' ||
      categoryText.includes(selectedCategory.toLowerCase())

    return matchesSearch && matchesMonth && matchesCategory
  })
}, [search, selectedMonth, selectedCategory])
    const seasonalHighlights = filteredFoods

  return (

    <main className="page">
      {!showMainContent && (
        <div className="design-hintergrund">
          <div className="fix-top-menu">
            <div className="hero-content">
              <h1>Finde saisonale Lebensmittel aus deiner Region</h1>
              <img
                src="/Objekt.png"
                id="pilzi-image"
                alt="Pilzi, dein Saison-Guide für Deutschland"
                className={`hero-image${fadeImage ? ' fade-out' : ''}`}
                ref={imageRef}
              />
              <section className="intro-box">
                <h2>Was hat gerade Saison?</h2>
                <h3 className="hero-desc">
                  Pilzi zeigt dir, wann Obst und Gemüse in Deutschland reif ist.
                </h3>
                {!showMainContent && (
                  <button
                    className="hero-cta"
                    style={{marginTop: '1.2em'}}
                    onClick={() => {
                      setFadeImage(true)
                      setTimeout(() => setShowMainContent(true), 600)
                    }}
                  >
                    Jetzt entdecken
                  </button>
                )}
              </section>
            </div>
          </div>
        </div>
      )}

    
    {showMainContent && (
      <>

        <div className="search-sticky-bar">
          <input
            type="text"
            placeholder="Lebensmittel suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <section className="filters-section">

  <div style={{display: 'flex', alignItems: 'center', gap: '0.9rem'}}>
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="month-select month-select--large"
      style={{minWidth: 180, maxWidth: 260, fontSize: '1.18rem', padding: '1.1rem 1.5rem'}}
    >
      <option>Alle Monate</option>
      {monthNames.map((month) => (
        <option key={month}>{month}</option>
      ))}
    </select>
    <img
      src="/Objekt.png"
      alt="Pilzi Mini"
      className="pilzi-animated"
      style={{width: 88, height: 88, marginLeft: 4}}
    />
  </div>

  <div className="category-filters">
    {categories.map((category) => (
      <button
        key={category}
        type="button"
        className={
          selectedCategory === category
            ? 'category-button active'
            : 'category-button'
        }
        onClick={() => setSelectedCategory(category)}
      >
        {category}
      </button>
    ))}
  </div>
        </section>
        <section className="saison-highlight-section" aria-label="Frische saisonale Lebensmittel im Monat">
          <h2 className="highlight-headline-small">
         Pilzis Regio-Check: Ernte & Mehr
          </h2>
          <p className="result-count">
           <strong>{selectedMonth}</strong> · <strong>{selectedCategory}</strong> · {filteredFoods.length} von {foods.length}
          </p>

        {filteredFoods.length > 0 ? (
        <div className="cards-grid">
          {filteredFoods.map((food) => (
            <article key={food.id} id={`food-${food.id}`} className="food-card">
              <div className="card-header">
                <h3>{food.name}</h3>
              </div>

              <div className="card-preview">
                <p>
                  <strong>Haltbarkeit:</strong> {food.haltbarkeit || '—'}
                </p>
              </div>

              <details className="food-details">
                <summary>Details anzeigen</summary>
                <div className="card-details">
                  {Object.entries(food).filter(([key]) => key !== 'id' && key !== 'name').map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value || '—'}
                    </p>
                  ))}
                </div>
              </details>
            </article>
          ))}
        </div>
      ) : (
        <div className="no-results">Keine Lebensmittel gefunden.</div>
      )}
        </section>
      </>
    )}

      <footer className="footer-fixed">
        <div className="footer-row">
          <a
            className="footer-link"
            href="#"
            onClick={e => {
              e.preventDefault();
              const modal = document.getElementById('impressum-modal');
              if (modal) modal.style.display = 'flex';
            }}
          >Impressum</a>
          <a className="footer-link" href="https://github.com/dubposse/pilzi" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="footer-link" href="https://github.com/dubposse/pilzi?tab=AGPL-3.0-1-ov-file" target="" rel="noopener noreferrer">Lizenz</a>
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
      </footer>
    </main>
  )
}