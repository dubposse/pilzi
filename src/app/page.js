'use client'

import { useMemo, useState } from 'react'
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

export default function Page() {
  const currentMonthIndex = new Date().getMonth()
  const [search, setSearch] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(monthNames[currentMonthIndex])

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

      return matchesSearch && matchesMonth
    })
  }, [search, selectedMonth])

  return (
    <main className="page">
      <div className="design-hintergrund">
        <div className="fix-top-menu">
          <div className="hero-content">
            <h1>Hallo! Ich bin Pilzi.</h1>

            <img
              src="/Objekt.png"
              id="pilzi-image"
              alt="Pilzi, dein Guide für saisonale Lebensmittel"
            />

            <p id="slogan">
              Finde heraus, welche Lebensmittel gerade Saison haben – und worauf
              du beim Kauf achten solltest.
            </p>

            <p className="subtext">
              Pilzi zeigt dir saisonale Lebensmittel in Deutschland mit Infos zu
              Haltbarkeit, Nährwerten und Auswahlmerkmalen.
            </p>
          </div>
        </div>
      </div>

      <section className="intro-box">
        <h2>Saisonale Lebensmittel</h2>
        <p>Suche gezielt nach Lebensmitteln und filtere nach Monat.</p>
      </section>

      <section className="filters-section">
        <input
          type="text"
          placeholder="Lebensmittel suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="month-select"
        >
          <option>Alle Monate</option>
          {monthNames.map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>
      </section>

      <section>
  <p className="result-count">
    Monat: <strong>{selectedMonth}</strong> · Treffer: {filteredFoods.length} von {foods.length}
  </p>

  {filteredFoods.length > 0 ? (
    <div className="cards-grid">
      {filteredFoods.map((food) => (
        <article key={food.id} className="food-card">
          <div className="card-header">
            <h3>{food.name}</h3>
            <span className="card-category">{food.kategorie || '—'}</span>
          </div>

          <div className="card-details">
            <p>
              <strong>kg-Preis:</strong> {food.kgPreis || '—'}
            </p>
            <p>
              <strong>Haltbarkeit:</strong> {food.haltbarkeit || '—'}
            </p>
            <p>
              <strong>Saison:</strong> {food.saison || '—'}
            </p>
            <p>
              <strong>Ballaststoffgehalt:</strong> {food.Ballaststoffgehalt || '—'}
            </p>
            <p>
              <strong>Menge / Woche:</strong> {food.verbrauchWoche || '—'}
            </p>
            <p>
              <strong>Menge / Tag:</strong> {food.verbrauchTag || '—'}
            </p>
            <p>
              <strong>Merkmal:</strong> {food.merkmal || '—'}
            </p>
            <p>
              <strong>Gratis-Vitamine:</strong> {food.info || '—'}
            </p>
          </div>
        </article>
      ))}
    </div>
  ) : (
    <div className="no-results">Keine Lebensmittel gefunden.</div>
  )}
</section>

      <footer>
        <details>
          <summary>
            <strong>Impressum</strong>
          </summary>
          <p id="impressum">
            Matthias Brehm | Nordwestring 89 | 90419 Nürnberg
            <br />
            matthiasbrehm1@gmx.de
          </p>
        </details>
      </footer>
    </main>
  )
}