'use client'

import { useMemo, useState, useRef } from 'react'
import Footer from './Footer'
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

// Professionelle Label-Zuordnung für die Anzeige
const fieldLabels = {
  kgPreis: 'Preis',
  haltbarkeit: 'Haltbarkeit',
  kategorie: 'Kategorie',
  saison: 'Saison',
  ballaststoffgehalt: 'Ballaststoffgehalt',
  verbrauchWoche: 'Verbrauch/Woche',
  verbrauchTag: 'Verbrauch/Tag',
  merkmal: 'Merkmal',
  info: 'Info'
}

export default function Page() {
  const appRef = useRef(null)
  
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
      <div className="design-hintergrund" style={{ minHeight: '100vh' }}>
        <div className="fix-top-menu">
          <div className="hero-content">
            <h1>Finde saisonale Lebensmittel aus deiner Region</h1>
            <img
              src="/Objekt.png"
              id="pilzi-image"
              alt="Pilzi, dein Saison-Guide für Deutschland"
              className="hero-image"
              loading="eager"
              fetchPriority="high"
            />
            <section className="intro-box">
              <h2>Was hat gerade Saison?</h2>
              <h3 className="hero-desc">
                Pilzi zeigt dir, wann Obst und Gemüse in Deutschland reif ist.
              </h3>
              <a
                href="#app"
                className="hero-cta"
                style={{
                  marginTop: '1.2em',
                  display: 'inline-block',
                  textDecoration: 'none',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 999,
                  pointerEvents: 'auto'
                }}
              >
                Jetzt entdecken
              </a>
            </section>
          </div>
        </div>
      </div>

      <div id="app" ref={appRef}>

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
      loading="lazy"
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
                  {Object.entries(food).filter(([key]) => key !== 'id' && key !== 'name' && key !== 'verbrauchWoche' && key !== 'verbrauchTag').map(([key, value]) => (
                    <p key={key}>
                      <strong>{fieldLabels[key] || key}:</strong> {value || '—'}
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
      </div>

      <Footer />
    </main>
  )
}